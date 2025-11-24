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
exports.ChatHistoryService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const rns_chat_history_entity_1 = require("../entities/rns-chat-history.entity");
const initiative_chat_history_entity_1 = require("../entities/initiative-chat-history.entity");
const roadblock_chat_history_entity_1 = require("../entities/roadblock-chat-history.entity");
const rna_chat_history_entity_1 = require("../entities/rna-chat-history.entity");
let ChatHistoryService = class ChatHistoryService {
    em;
    constructor(em) {
        this.em = em;
    }
    async getRnsChatHistory(rnsId) {
        const chatHistory = await this.em.find(rns_chat_history_entity_1.RnsChatHistory, { rns: { id: rnsId } }, {
            orderBy: { createdAt: 'ASC' },
            populate: ['rns'],
        });
        return chatHistory.map((message) => ({
            id: message.id,
            role: message.role,
            content: message.content,
            createdAt: message.createdAt,
            refinedDescription: message.refinedDescription,
        }));
    }
    async getInitiativeChatHistory(initiativeId) {
        const chatHistory = await this.em.find(initiative_chat_history_entity_1.InitiativeChatHistory, { initiative: { id: initiativeId } }, {
            orderBy: { createdAt: 'ASC' },
            populate: ['initiative'],
        });
        return chatHistory.map((message) => ({
            id: message.id,
            role: message.role,
            content: message.content,
            createdAt: message.createdAt,
            refinedDescription: message.refinedDescription,
            refinedMeasures: message.refinedMeasures,
            refinedTargets: message.refinedTargets,
            refinedRemarks: message.refinedRemarks,
        }));
    }
    async getRoadblockChatHistory(roadblockId) {
        const chatHistory = await this.em.find(roadblock_chat_history_entity_1.RoadblockChatHistory, { roadblock: { id: roadblockId } }, {
            orderBy: { createdAt: 'ASC' },
            populate: ['roadblock'],
        });
        return chatHistory.map((message) => ({
            id: message.id,
            role: message.role,
            content: message.content,
            createdAt: message.createdAt,
            refinedDescription: message.refinedDescription,
            refinedFix: message.refinedFix,
        }));
    }
    async getRnaChatHistory(rnaId) {
        const chatHistory = await this.em.find(rna_chat_history_entity_1.RnaChatHistory, { rna: { id: rnaId } }, {
            orderBy: { createdAt: 'ASC' },
            populate: ['rna'],
        });
        return chatHistory.map((message) => ({
            id: message.id,
            role: message.role,
            content: message.content,
            createdAt: message.createdAt,
            refinedRna: message.refinedRna,
        }));
    }
};
exports.ChatHistoryService = ChatHistoryService;
exports.ChatHistoryService = ChatHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], ChatHistoryService);
//# sourceMappingURL=chat-history.service.js.map