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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHistoryController = void 0;
const common_1 = require("@nestjs/common");
const chat_history_service_1 = require("./chat-history.service");
let ChatHistoryController = class ChatHistoryController {
    chatHistoryService;
    constructor(chatHistoryService) {
        this.chatHistoryService = chatHistoryService;
    }
    async getRnsChatHistory(rnsId) {
        return await this.chatHistoryService.getRnsChatHistory(rnsId);
    }
    async getInitiativeChatHistory(initiativeId) {
        return await this.chatHistoryService.getInitiativeChatHistory(initiativeId);
    }
    async getRoadblockChatHistory(roadblockId) {
        return await this.chatHistoryService.getRoadblockChatHistory(roadblockId);
    }
    async getRnaChatHistory(rnaId) {
        return await this.chatHistoryService.getRnaChatHistory(rnaId);
    }
};
exports.ChatHistoryController = ChatHistoryController;
__decorate([
    (0, common_1.Get)('rns/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatHistoryController.prototype, "getRnsChatHistory", null);
__decorate([
    (0, common_1.Get)('initiatives/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatHistoryController.prototype, "getInitiativeChatHistory", null);
__decorate([
    (0, common_1.Get)('roadblocks/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatHistoryController.prototype, "getRoadblockChatHistory", null);
__decorate([
    (0, common_1.Get)('rna/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatHistoryController.prototype, "getRnaChatHistory", null);
exports.ChatHistoryController = ChatHistoryController = __decorate([
    (0, common_1.Controller)('chat-history'),
    __metadata("design:paramtypes", [chat_history_service_1.ChatHistoryService])
], ChatHistoryController);
//# sourceMappingURL=chat-history.controller.js.map