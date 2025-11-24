"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RnaService = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const rna_entity_1 = require("../entities/rna.entity");
const startup_entity_1 = require("../entities/startup.entity");
const readiness_level_entity_1 = require("../entities/readiness-level.entity");
const startup_readiness_level_entity_1 = require("../entities/startup-readiness-level.entity");
const ai_service_1 = require("../ai/ai.service");
const prompt_utils_1 = require("../ai/utils/prompt.utils");
const rna_chat_history_entity_1 = require("../entities/rna-chat-history.entity");
let RnaService = class RnaService {
    em;
    aiService;
    constructor(em, aiService) {
        this.em = em;
        this.aiService = aiService;
    }
    async getRNAbyId(startupId) {
        return await this.em.find(rna_entity_1.StartupRNA, { startup: startupId }, {
            populate: ['readinessLevel'],
        });
    }
    async create(dto) {
        if (!dto.readiness_level_id) {
            throw new common_1.BadRequestException('readiness_level_id is required');
        }
        const readinessRef = this.em.getReference(readiness_level_entity_1.ReadinessLevel, dto.readiness_level_id);
        const startupRef = this.em.getReference(startup_entity_1.Startup, dto.startup_id);
        const rna = this.em.create(rna_entity_1.StartupRNA, {
            rna: dto.rna,
            isAiGenerated: dto.isAiGenerated ?? false,
            startup: startupRef,
            readinessLevel: readinessRef,
        });
        await this.em.persistAndFlush(rna);
        return rna;
    }
    async update(id, dto) {
        const rna = await this.em.findOneOrFail(rna_entity_1.StartupRNA, { id });
        if (dto.rna !== undefined) {
            rna.rna = dto.rna;
        }
        if (dto.isAiGenerated !== undefined) {
            rna.isAiGenerated = dto.isAiGenerated;
        }
        await this.em.flush();
        return rna;
    }
    async delete(id) {
        const rna = await this.em.findOne(rna_entity_1.StartupRNA, { id });
        if (!rna)
            throw new common_1.NotFoundException(`RNA with ID ${id} not found`);
        await this.em.removeAndFlush(rna);
        return rna;
    }
    async generateRNA(id) {
        const startup = await this.em.findOne(startup_entity_1.Startup, { id: id }, {
            populate: ['capsuleProposal'],
        });
        if (!startup)
            throw new common_1.NotFoundException('Startup not found');
        const capsuleProposalInfo = startup.capsuleProposal;
        if (!capsuleProposalInfo)
            throw new common_1.BadRequestException('No capsule proposal found.');
        const existingRNAs = await this.em.find(rna_entity_1.StartupRNA, { startup: startup }, {
            populate: ['readinessLevel'],
        });
        const startupReadinessLevels = await this.em.find(startup_readiness_level_entity_1.StartupReadinessLevel, { startup: startup }, { populate: ['readinessLevel'] });
        const readinessLevelsWithoutRNA = startupReadinessLevels.filter((startupReadinessLevel) => !existingRNAs.some((existingRNA) => existingRNA.readinessLevel.id ===
            startupReadinessLevel.readinessLevel.id));
        if (readinessLevelsWithoutRNA.length === 0) {
            return [];
        }
        const readinessLevelData = startupReadinessLevels.map((srl, index) => ({
            type: srl.readinessLevel.readinessType,
            level: srl.readinessLevel.level,
            hasRNA: existingRNAs.some((rna) => rna.readinessLevel.id === srl.readinessLevel.id),
        }));
        const trl = startupReadinessLevels[0]?.readinessLevel.level || 0;
        const mrl = startupReadinessLevels[1]?.readinessLevel.level || 0;
        const arl = startupReadinessLevels[2]?.readinessLevel.level || 0;
        const orl = startupReadinessLevels[3]?.readinessLevel.level || 0;
        const rrl = startupReadinessLevels[4]?.readinessLevel.level || 0;
        const irl = startupReadinessLevels[5]?.readinessLevel.level || 0;
        const basePrompt = `
      Given these data:
      Acceleration Proposal Title: ${capsuleProposalInfo.title}
      Duration: 3 months
      I. About the startup
      A. Startup Description
      ${capsuleProposalInfo.description}
      B. Problem Statement
      ${capsuleProposalInfo.problemStatement}
      C. Target Market
      ${capsuleProposalInfo.targetMarket}
      D. Solution Description
      ${capsuleProposalInfo.solutionDescription}
      II. About the Proposed Acceleration
      A. Objectives
      ${capsuleProposalInfo.objectives}
      B. Scope of The Proposal
      ${capsuleProposalInfo.scope}
      C. Methodology and Expected Outputs
      ${capsuleProposalInfo.methodology}
      Initial Readiness Level:
      TRL ${trl}
      MRL ${mrl}
      ARL ${arl}
      ORL ${orl}
      RRL ${rrl}
      IRL ${irl}
      `;
        const missingReadinessTypes = readinessLevelsWithoutRNA.map((rl) => rl.readinessLevel.readinessType);
        const prompt = `
      ${basePrompt}
      
      TASK: Generate a RNA(Readiness and Needs Assessment) for the following readiness levels that are missing: ${missingReadinessTypes.join(', ')}.
      Requirement: The response should be in a JSON format.
      JSON format: [{"readiness_level_type": (string), "rna": ""(string)}]
      Requirement:
      - readiness_level_type should only be one of: ${missingReadinessTypes.join(', ')}
      - rna has a max length of 500
      - rna should be specific to that readiness type only.
      `;
        const generatedRNAs = await this.aiService.generateRNAsFromPrompt(prompt);
        const createdRNAs = [];
        for (const generatedRNA of generatedRNAs) {
            const matchingReadinessLevel = readinessLevelsWithoutRNA.find((rl) => rl.readinessLevel.readinessType === generatedRNA.readiness_level_type);
            if (matchingReadinessLevel) {
                const newRNA = new rna_entity_1.StartupRNA();
                newRNA.rna = generatedRNA.rna;
                newRNA.isAiGenerated = true;
                newRNA.startup = startup;
                newRNA.readinessLevel = matchingReadinessLevel.readinessLevel;
                await this.em.persist(newRNA);
                createdRNAs.push(newRNA);
            }
        }
        await this.em.flush();
        return createdRNAs.map((r) => ({
            id: r.id,
            rna: r.rna,
            isAiGenerated: r.isAiGenerated,
            startup: r.startup,
            readinessLevel: r.readinessLevel,
        }));
    }
    async checkIfAllReadinessTypesHaveRNA(startupId) {
        const startup = await this.em.findOne(startup_entity_1.Startup, { id: startupId });
        if (!startup)
            throw new common_1.NotFoundException('Startup not found');
        const startupReadinessLevels = await this.em.find(startup_readiness_level_entity_1.StartupReadinessLevel, { startup: startup }, { populate: ['readinessLevel'] });
        const existingRNAs = await this.em.find(rna_entity_1.StartupRNA, { startup: startup }, {
            populate: ['readinessLevel'],
        });
        return startupReadinessLevels.every((startupReadinessLevel) => existingRNAs.some((existingRNA) => existingRNA.readinessLevel.id ===
            startupReadinessLevel.readinessLevel.id));
    }
    async refineRna(rnaId, chatHistory, latestPrompt) {
        const rna = await this.em.findOne(rna_entity_1.StartupRNA, { id: rnaId }, {
            populate: ['startup', 'startup.capsuleProposal', 'readinessLevel'],
        });
        if (!rna)
            throw new common_1.NotFoundException('RNA not found');
        const startup = rna.startup;
        const capsuleProposalInfo = startup.capsuleProposal;
        if (!capsuleProposalInfo)
            throw new common_1.BadRequestException('No capsule proposal found for this startup.');
        const basePrompt = await (0, prompt_utils_1.createBasePrompt)(startup, this.em);
        const prompt = `${basePrompt}

      Current RNA Details:
      Readiness Type: ${rna.readinessLevel.readinessType}
      Current Level: ${rna.readinessLevel.level}
      RNA Description: ${rna.rna}
      
      Chat History:
      ${chatHistory.map((msg) => `${msg.role}: ${msg.content}`).join('\n')}

      User: ${latestPrompt}

      IMPORTANT INSTRUCTIONS:
      1. Only refine the RNA description that the user explicitly asks to modify
      2. Do not modify any other fields
      3. Respond with a JSON object containing ONLY the requested refinements
      4. If the user did not specify what to refine, refine the RNA description
      5. Use the exact field name shown in the example

      Example response format:
      {
          "refinedRna": "your refined RNA description here"
      }
      =========
      Your commentary about the changes here.

      Available fields:
      - refinedRna (for RNA description updates)

      Remember:
      - Only include the refinedRna field if the user specifically asks to refine the RNA description
      - The JSON must be valid and properly formatted
      - Always include the ========= separator followed by your commentary`;
        const result = await this.aiService.refineRna(prompt);
        const newMessages = [
            new rna_chat_history_entity_1.RnaChatHistory({
                rna,
                role: 'User',
                content: latestPrompt,
            }),
            new rna_chat_history_entity_1.RnaChatHistory({
                rna,
                role: 'Ai',
                content: result.aiCommentary,
                refinedRna: result.refinedRna,
            }),
        ];
        await this.em.persistAndFlush(newMessages);
        return result;
    }
};
exports.RnaService = RnaService;
exports.RnaService = RnaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager,
        ai_service_1.AiService])
], RnaService);
//# sourceMappingURL=rna.service.js.map