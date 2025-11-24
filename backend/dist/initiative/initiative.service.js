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
exports.InitiativeService = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const initiative_entity_1 = require("../entities/initiative.entity");
const rns_entity_1 = require("../entities/rns.entity");
const user_entity_1 = require("../entities/user.entity");
const startup_entity_1 = require("../entities/startup.entity");
const ai_service_1 = require("../ai/ai.service");
const prompt_utils_1 = require("../ai/utils/prompt.utils");
const rns_enum_1 = require("../entities/enums/rns.enum");
const initiative_chat_history_entity_1 = require("../entities/initiative-chat-history.entity");
let InitiativeService = class InitiativeService {
    em;
    aiService;
    constructor(em, aiService) {
        this.em = em;
        this.aiService = aiService;
    }
    async getStartupInitiative(startupId) {
        return this.em.find(initiative_entity_1.Initiative, { startup: startupId }, { orderBy: { id: 'ASC' } });
    }
    async createInitiative(dto) {
        const initiative = new initiative_entity_1.Initiative();
        initiative.initiativeNumber = dto.initiativeNumber;
        initiative.priorityNumber = 0;
        initiative.status = dto.status;
        initiative.requestedStatus = dto.status;
        initiative.approvalStatus = 'Unchanged';
        initiative.rns = this.em.getReference(rns_entity_1.Rns, dto.rnsId);
        initiative.isAiGenerated = dto.isAiGenerated;
        initiative.assignee = this.em.getReference(user_entity_1.User, dto.assigneeId);
        initiative.startup = this.em.getReference(startup_entity_1.Startup, dto.startupId);
        initiative.description = dto.description;
        initiative.measures = dto.measures;
        initiative.targets = dto.targets;
        initiative.remarks = dto.remarks;
        await this.em.persistAndFlush(initiative);
        return initiative;
    }
    async update(id, dto) {
        const initiative = await this.em.findOne(initiative_entity_1.Initiative, { id });
        if (!initiative)
            throw new common_1.NotFoundException('Initiative not found');
        if (dto.initiativeNumber !== undefined) {
            initiative.initiativeNumber = dto.initiativeNumber;
        }
        if (dto.status !== undefined) {
            initiative.status = dto.status;
        }
        if (dto.requestedStatus !== undefined) {
            initiative.requestedStatus = dto.requestedStatus;
        }
        if (dto.approvalStatus !== undefined) {
            initiative.approvalStatus = dto.approvalStatus;
        }
        if (dto.isAiGenerated !== undefined) {
            initiative.isAiGenerated = dto.isAiGenerated;
        }
        if (dto.rnsId !== undefined) {
            initiative.rns = this.em.getReference(rns_entity_1.Rns, dto.rnsId);
        }
        if (dto.assigneeId !== undefined) {
            initiative.assignee = this.em.getReference(user_entity_1.User, dto.assigneeId);
        }
        if (dto.startupId !== undefined) {
            initiative.startup = this.em.getReference(startup_entity_1.Startup, dto.startupId);
        }
        if (dto.description !== undefined) {
            initiative.description = dto.description;
        }
        if (dto.measures !== undefined) {
            initiative.measures = dto.measures;
        }
        if (dto.targets !== undefined) {
            initiative.targets = dto.targets;
        }
        if (dto.remarks !== undefined) {
            initiative.remarks = dto.remarks;
        }
        if (dto.clickedByMentor !== undefined) {
            initiative.clickedByMentor = dto.clickedByMentor;
        }
        if (dto.clickedByStartup !== undefined) {
            initiative.clickedByStartup = dto.clickedByStartup;
        }
        await this.em.flush();
        return initiative;
    }
    async statusChange(id, role, dto) {
        const initiative = await this.em.findOne(initiative_entity_1.Initiative, { id });
        if (!initiative)
            throw new common_1.NotFoundException('Initiative not found');
        if (initiative.requestedStatus === dto.status) {
            return initiative;
        }
        if (role === 'Startup') {
            if (initiative.status === dto.status) {
                initiative.approvalStatus = 'Unchanged';
            }
            else {
                initiative.approvalStatus = 'Pending';
            }
            initiative.requestedStatus = dto.status;
        }
        else {
            initiative.status = dto.status;
            initiative.approvalStatus = 'Unchanged';
            initiative.requestedStatus = dto.status;
        }
        await this.em.flush();
        return initiative;
    }
    async delete(id) {
        const initiative = await this.em.findOne(initiative_entity_1.Initiative, { id });
        if (!initiative)
            throw new common_1.NotFoundException('Initiative not found');
        await this.em.removeAndFlush(initiative);
        return { message: 'Initiative deleted successfully' };
    }
    async generateInitiatives(dto) {
        if (dto.rnsIds && dto.rnsIds.length > 0) {
            const initiatives = [];
            const existingInitiatives = await this.em.find(initiative_entity_1.Initiative, {}, { orderBy: { initiativeNumber: 'ASC' } });
            let minInitiativeNumber = existingInitiatives.length > 0
                ? existingInitiatives[0].initiativeNumber
                : 1;
            if (minInitiativeNumber > 1)
                minInitiativeNumber = 1;
            for (const initiative of existingInitiatives) {
                initiative.initiativeNumber += dto.rnsIds.length;
                await this.em.persistAndFlush(initiative);
            }
            for (let i = 0; i < dto.rnsIds.length; i++) {
                const rnsId = dto.rnsIds[i];
                const rns = await this.em.findOneOrFail(rns_entity_1.Rns, { id: rnsId }, {
                    populate: [
                        'startup',
                        'startup.capsuleProposal',
                        'readinessType',
                        'status',
                        'targetLevel',
                    ],
                });
                const maxInitiativeNumber = (await this.em.count(initiative_entity_1.Initiative, { startup: rns.startup })) + 1;
                const basePrompt = await (0, prompt_utils_1.createBasePrompt)(rns.startup, this.em);
                if (!basePrompt)
                    throw new common_1.BadRequestException('No capsule proposal found');
                const rnsPrompt = `
            priorityNumber: ${rns.priorityNumber}
            readinessType: ${rns.readinessType}
            targetLevel: ${rns.targetLevel.level}
            description: ${rns.description}
            taskType: ${rns_enum_1.RnsStatus[rns.status]}
            `;
                const prompt = `
            ${basePrompt}   

            Based on this RNS:
            ${rnsPrompt}

            Task: Create me ${dto.no_of_initiatives_to_create} initiatives for the startup's personalized RNS.
            Requirement: The response should be in a JSON format.
            It should consist of description, measures, targets, remarks
            JSON format: [{"description": "", "measures": "", "targets": "", "remarks":""}]
            Requirement note:
            - description max 400
            - measures, targets, and remarks max 150
            `;
                const resultText = await this.aiService.generateInitiativesFromPrompt(prompt);
                for (const entry of resultText) {
                    const initiative = new initiative_entity_1.Initiative();
                    initiative.initiativeNumber = minInitiativeNumber + i;
                    initiative.description = entry.description;
                    initiative.measures = entry.measures;
                    initiative.targets = entry.targets;
                    initiative.remarks = entry.remarks;
                    initiative.rns = rns;
                    initiative.isAiGenerated = false;
                    initiative.startup = rns.startup;
                    initiative.assignee = rns.startup.user;
                    initiative.status = 1;
                    initiative.priorityNumber = 0;
                    initiative.requestedStatus = 1;
                    await this.em.persistAndFlush(initiative);
                    initiatives.push(initiative);
                }
            }
            return initiatives;
        }
        else if (dto.rnsId) {
            const existingInitiatives = await this.em.find(initiative_entity_1.Initiative, {}, { orderBy: { initiativeNumber: 'ASC' } });
            let minInitiativeNumber = existingInitiatives.length > 0
                ? existingInitiatives[0].initiativeNumber
                : 1;
            if (minInitiativeNumber > 1)
                minInitiativeNumber = 1;
            for (const initiative of existingInitiatives) {
                initiative.initiativeNumber += 1;
                await this.em.persistAndFlush(initiative);
            }
            const rns = await this.em.findOneOrFail(rns_entity_1.Rns, { id: dto.rnsId }, {
                populate: [
                    'startup',
                    'startup.capsuleProposal',
                    'readinessType',
                    'status',
                    'targetLevel',
                ],
            });
            const basePrompt = await (0, prompt_utils_1.createBasePrompt)(rns.startup, this.em);
            if (!basePrompt)
                throw new common_1.BadRequestException('No capsule proposal found');
            const rnsPrompt = `
            priorityNumber: ${rns.priorityNumber}
            readinessType: ${rns.readinessType}
            targetLevel: ${rns.targetLevel.level}
            description: ${rns.description}
            taskType: ${rns_enum_1.RnsStatus[rns.status]}
            `;
            const prompt = `
            ${basePrompt}

            Based on this RNS:
            ${rnsPrompt}

            Task: Create me ${dto.no_of_initiatives_to_create} initiatives for the startup's personalized RNS.
            Requirement: The response should be in a JSON format.
            It should consist of description, measures, targets, remarks
            JSON format: [{"description": "", "measures": "", "targets": "", "remarks":""}]
            Requirement note:
            - description max 400
            - measures, targets, and remarks max 150
            `;
            const resultText = await this.aiService.generateInitiativesFromPrompt(prompt);
            const initiatives = [];
            for (const entry of resultText) {
                const initiative = new initiative_entity_1.Initiative();
                initiative.initiativeNumber = minInitiativeNumber;
                initiative.description = entry.description;
                initiative.measures = entry.measures;
                initiative.targets = entry.targets;
                initiative.remarks = entry.remarks;
                initiative.rns = rns;
                initiative.isAiGenerated = false;
                initiative.startup = rns.startup;
                initiative.assignee = rns.startup.user;
                initiative.status = 1;
                initiative.priorityNumber = 0;
                await this.em.persistAndFlush(initiative);
                initiatives.push(initiative);
            }
            return initiatives;
        }
        else {
            throw new common_1.BadRequestException('Either rnsId or rnsIds must be provided');
        }
    }
    async refineInitiative(initiativeId, chatHistory, latestPrompt) {
        const initiative = await this.em.findOne(initiative_entity_1.Initiative, { id: initiativeId }, {
            populate: ['startup', 'startup.capsuleProposal', 'rns'],
        });
        if (!initiative)
            throw new common_1.NotFoundException('Initiative not found');
        const startup = initiative.startup;
        const capsuleProposalInfo = startup.capsuleProposal;
        if (!capsuleProposalInfo)
            throw new common_1.BadRequestException('No capsule proposal found for this startup.');
        const basePrompt = await (0, prompt_utils_1.createBasePrompt)(startup, this.em);
        const prompt = `${basePrompt}

        Current Initiative Details:
        Description: ${initiative.description}
        Measures: ${initiative.measures}
        Targets: ${initiative.targets}
        Remarks: ${initiative.remarks}
        
        Related RNS Task:
        ${initiative.rns.description}

        Chat History:
        ${chatHistory.map((msg) => `${msg.role}: ${msg.content}`).join('\n')}

        User: ${latestPrompt}

        IMPORTANT INSTRUCTIONS:
        1. Only refine the specific fields that the user explicitly asks to modify
        2. Do not modify any other fields
        3. Respond with a JSON object containing ONLY the requested refinements
        4. If the user did not specify a field to refine, refine all fields.
        5. Use the exact field names shown in the example

        Example response format:
        If user asks to update measures only:
        {
            "refinedMeasures": "your refined measures here"
        }
        =========
        Your commentary about the changes here.

        If user asks to update description and targets:
        {
            "refinedDescription": "your refined description here",
            "refinedTargets": "your refined targets here"
        }
        =========
        Your commentary about the changes here.

        Available fields:
        - refinedDescription (for description updates)
        - refinedMeasures (for measures updates)
        - refinedTargets (for targets updates)
        - refinedRemarks (for remarks updates)

        Remember:
        - Only include fields that the user specifically asks to refine
        - The JSON must be valid and properly formatted
        - Always include the ========= separator followed by your commentary`;
        const result = await this.aiService.refineInitiative(prompt);
        const newMessages = [
            new initiative_chat_history_entity_1.InitiativeChatHistory({
                initiative,
                role: 'User',
                content: latestPrompt,
            }),
            new initiative_chat_history_entity_1.InitiativeChatHistory({
                initiative,
                role: 'Ai',
                content: result.aiCommentary,
                refinedDescription: result.refinedDescription,
                refinedMeasures: result.refinedMeasures,
                refinedTargets: result.refinedTargets,
                refinedRemarks: result.refinedRemarks,
            }),
        ];
        await this.em.persistAndFlush(newMessages);
        return result;
    }
};
exports.InitiativeService = InitiativeService;
exports.InitiativeService = InitiativeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager,
        ai_service_1.AiService])
], InitiativeService);
//# sourceMappingURL=initiative.service.js.map