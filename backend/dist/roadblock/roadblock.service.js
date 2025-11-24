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
exports.RoadblockService = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const roadblock_entity_1 = require("../entities/roadblock.entity");
const user_entity_1 = require("../entities/user.entity");
const startup_entity_1 = require("../entities/startup.entity");
const ai_service_1 = require("../ai/ai.service");
const rns_enum_1 = require("../entities/enums/rns.enum");
const rns_entity_1 = require("../entities/rns.entity");
const initiative_entity_1 = require("../entities/initiative.entity");
const prompt_utils_1 = require("../ai/utils/prompt.utils");
const roadblock_chat_history_entity_1 = require("../entities/roadblock-chat-history.entity");
let RoadblockService = class RoadblockService {
    em;
    aiService;
    constructor(em, aiService) {
        this.em = em;
        this.aiService = aiService;
    }
    async getByStartupId(startupId) {
        return this.em.find(roadblock_entity_1.Roadblock, { startup: startupId }, { orderBy: { id: 'ASC' } });
    }
    async createRoadblock(dto) {
        const roadblock = new roadblock_entity_1.Roadblock();
        roadblock.assignee = this.em.getReference(user_entity_1.User, dto.assigneeId);
        roadblock.startup = this.em.getReference(startup_entity_1.Startup, dto.startupId);
        roadblock.isAiGenerated = dto.isAiGenerated;
        roadblock.status = dto.status;
        roadblock.riskNumber = dto.riskNumber;
        roadblock.description = dto.description;
        roadblock.fix = dto.fix;
        await this.em.persistAndFlush(roadblock);
        return roadblock;
    }
    async update(id, dto) {
        const roadblock = await this.em.findOneOrFail(roadblock_entity_1.Roadblock, id);
        if (dto.assigneeId !== undefined) {
            roadblock.assignee = this.em.getReference(user_entity_1.User, dto.assigneeId);
        }
        if (dto.startupId !== undefined) {
            roadblock.startup = this.em.getReference(startup_entity_1.Startup, dto.startupId);
        }
        if (dto.isAiGenerated !== undefined) {
            roadblock.isAiGenerated = dto.isAiGenerated;
        }
        if (dto.status !== undefined) {
            roadblock.status = dto.status;
        }
        if (dto.requestedStatus !== undefined) {
            roadblock.requestedStatus = dto.requestedStatus;
        }
        if (dto.approvalStatus !== undefined) {
            roadblock.approvalStatus = dto.approvalStatus;
        }
        if (dto.riskNumber !== undefined) {
            roadblock.riskNumber = dto.riskNumber;
        }
        if (dto.description !== undefined) {
            roadblock.description = dto.description;
        }
        if (dto.fix !== undefined) {
            roadblock.fix = dto.fix;
        }
        if (dto.clickedByMentor !== undefined) {
            roadblock.clickedByMentor = dto.clickedByMentor;
        }
        if (dto.clickedByStartup !== undefined) {
            roadblock.clickedByStartup = dto.clickedByStartup;
        }
        await this.em.flush();
        return roadblock;
    }
    async statusChange(id, role, dto) {
        const roadblock = await this.em.findOne(roadblock_entity_1.Roadblock, { id });
        if (!roadblock)
            throw new common_1.NotFoundException('Roadblock not found');
        if (roadblock.requestedStatus === dto.status) {
            return roadblock;
        }
        if (role === 'Startup') {
            if (roadblock.status === dto.status) {
                roadblock.approvalStatus = 'Unchanged';
            }
            else {
                roadblock.approvalStatus = 'Pending';
            }
            roadblock.requestedStatus = dto.status;
        }
        else {
            roadblock.status = dto.status;
            roadblock.approvalStatus = 'Unchanged';
            roadblock.requestedStatus = dto.status;
        }
        await this.em.flush();
        return roadblock;
    }
    async deleteRoadblock(id) {
        const roadblock = await this.em.findOne(roadblock_entity_1.Roadblock, { id });
        if (!roadblock)
            throw new common_1.NotFoundException('Roadblock not found');
        await this.em.removeAndFlush(roadblock);
        return { message: 'Roadblock deleted successfully' };
    }
    async generateRoadblocks(dto) {
        const startup = await this.em.findOneOrFail(startup_entity_1.Startup, { id: dto.startupId }, {
            populate: ['capsuleProposal', 'user'],
        });
        if (!startup.capsuleProposal) {
            throw new common_1.BadRequestException('No capsule proposal found.');
        }
        const basePrompt = await this.aiService.createBasePrompt(startup, this.em);
        const excludeStatuses = [rns_enum_1.RnsStatus.Discontinued, rns_enum_1.RnsStatus.Completed];
        const tasks = await this.em.find(rns_entity_1.Rns, {
            startup: startup,
            status: { $nin: excludeStatuses },
        }, {
            populate: ['targetLevel'],
        });
        const taskIds = tasks.map((task) => task.id);
        const initiatives = await this.em.find(initiative_entity_1.Initiative, {
            rns: { $in: taskIds },
            status: { $nin: excludeStatuses },
        });
        const tasksPrompt = tasks
            .map((task) => `
        priorityNumber: ${task.priorityNumber}
        readinessType: ${task.readinessType}
        targetLevel: ${task.targetLevel.level}
        description: ${task.description}
        taskType: ${rns_enum_1.RnsStatus[task.status]}
        `)
            .join('\n\n');
        const initiativesPrompt = initiatives
            .map((initiative) => `
        initiativeNumber: ${initiative.initiativeNumber}
        description: ${initiative.description}
        measures: ${initiative.measures}
        targets: ${initiative.targets}
        remarks: ${initiative.remarks}
        `)
            .join('\n\n');
        const prompt = `
        ${basePrompt}

        Based on these tasks:
        ${tasksPrompt}

        Based on these initiatives:
        ${initiativesPrompt}

        Task: If roadblock exists for the startup's personalized tasks and initiatives, create me exactly ${dto.no_of_roadblocks_to_create} roadblocks. Approximate a risk number between 1 to 5, where 1 means least risk and 5 means highest risk. Else return an empty list.
        Requirement: The response should be in a JSON format.
        It should consist of description, fix, and riskNumber which should be an integer from 1 to 5.
        JSON format: [{"description": "", "fix": "", "riskNumber": (number)}]
        Requirement note:
        - description and fix have 500 max length
        - return an empty list if no roadblock exists.
        `;
        if (dto.debug) {
            return prompt;
        }
        const resultData = await this.aiService.generateRoadblocksFromPrompt(prompt);
        const roadblocks = [];
        for (const data of resultData) {
            const roadblock = new roadblock_entity_1.Roadblock();
            roadblock.startup = startup;
            roadblock.assignee = startup.user;
            roadblock.isAiGenerated = false;
            roadblock.status = 1;
            roadblock.riskNumber = Number(data.riskNumber);
            roadblock.description = data.description;
            roadblock.fix = data.fix;
            roadblock.requestedStatus = 1;
            await this.em.persistAndFlush(roadblock);
        }
        return roadblocks;
    }
    async refineRoadblock(roadblockId, chatHistory, latestPrompt) {
        const roadblock = await this.em.findOne(roadblock_entity_1.Roadblock, { id: roadblockId }, {
            populate: ['startup', 'startup.capsuleProposal'],
        });
        if (!roadblock)
            throw new common_1.NotFoundException('Roadblock not found');
        const startup = roadblock.startup;
        const capsuleProposalInfo = startup.capsuleProposal;
        if (!capsuleProposalInfo)
            throw new common_1.BadRequestException('No capsule proposal found for this startup.');
        const basePrompt = await (0, prompt_utils_1.createBasePrompt)(startup, this.em);
        const prompt = `${basePrompt}

        Current Roadblock Details:
        Description: ${roadblock.description}
        Fix: ${roadblock.fix}
        Risk Level: ${roadblock.riskNumber}

        Chat History:
        ${chatHistory.map((msg) => `${msg.role}: ${msg.content}`).join('\n')}

        User: ${latestPrompt}

        Please refine the roadblock details according to the user's instructions.
        After the JSON, write '=========' on a new line, then provide a brief AI commentary (1-2 sentences) explaining your changes.

        IMPORTANT INSTRUCTIONS:
        1. Only refine the specific fields that the user explicitly asks to modify
        2. Do not modify any other fields
        3. Respond with a JSON object containing ONLY the requested refinements
        4. If the user did not specify a field to refine, refine all fields.
        4. Use the exact field names shown in the example

        Example response format:
        If user asks to update description only:
        {
            "refinedDescription": "your refined description here"
        }
        =========
        Your commentary about the changes here.

        If user asks to update description and fix:
        {
            "refinedDescription": "your refined description here",
            "refinedFix": "your refined fix here"
        }
        =========
        Your commentary about the changes here.

        Available fields:
        - refinedDescription (for description updates)
        - refinedFix (for fix updates)

        Remember:
        - If the user specifies, only include fields that the user specifically asks to refine
        - The JSON must be valid and properly formatted
        - Always include the ========= separator followed by your commentary
        `;
        const result = await this.aiService.refineRoadblock(prompt);
        const newMessages = [
            new roadblock_chat_history_entity_1.RoadblockChatHistory({
                roadblock,
                role: 'User',
                content: latestPrompt,
            }),
            new roadblock_chat_history_entity_1.RoadblockChatHistory({
                roadblock,
                role: 'Ai',
                content: result.aiCommentary,
                refinedDescription: result.refinedDescription,
                refinedFix: result.refinedFix,
            }),
        ];
        await this.em.persistAndFlush(newMessages);
        return result;
    }
    async getRoadblockChatHistory(roadblockId) {
        return this.em.find(roadblock_chat_history_entity_1.RoadblockChatHistory, { roadblock: { id: roadblockId } }, { orderBy: { createdAt: 'ASC' } });
    }
};
exports.RoadblockService = RoadblockService;
exports.RoadblockService = RoadblockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager,
        ai_service_1.AiService])
], RoadblockService);
//# sourceMappingURL=roadblock.service.js.map