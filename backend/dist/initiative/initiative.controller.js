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
exports.InitiativeController = void 0;
const common_1 = require("@nestjs/common");
const initiative_service_1 = require("./initiative.service");
const initiative_dto_1 = require("./dto/initiative.dto");
let InitiativeController = class InitiativeController {
    initiativeService;
    constructor(initiativeService) {
        this.initiativeService = initiativeService;
    }
    async getStartupInitiative(startupId) {
        return await this.initiativeService.getStartupInitiative(startupId);
    }
    async createInitiative(dto) {
        return await this.initiativeService.createInitiative(dto);
    }
    async update(id, dto) {
        return this.initiativeService.update(id, dto);
    }
    async delete(id) {
        return this.initiativeService.delete(id);
    }
    async generateInitiatives(dto) {
        return await this.initiativeService.generateInitiatives(dto);
    }
    async refineInitiative(id, dto) {
        return await this.initiativeService.refineInitiative(id, dto.chatHistory, dto.latestPrompt);
    }
    async roleStatusUpdate(id, role, dto) {
        return this.initiativeService.statusChange(id, role, dto);
    }
};
exports.InitiativeController = InitiativeController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InitiativeController.prototype, "getStartupInitiative", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [initiative_dto_1.CreateInitiativeDto]),
    __metadata("design:returntype", Promise)
], InitiativeController.prototype, "createInitiative", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, initiative_dto_1.UpdateInitiativeDto]),
    __metadata("design:returntype", Promise)
], InitiativeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InitiativeController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('generate-initiatives'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [initiative_dto_1.GenerateInitiativeDto]),
    __metadata("design:returntype", Promise)
], InitiativeController.prototype, "generateInitiatives", null);
__decorate([
    (0, common_1.Post)(':id/refine'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InitiativeController.prototype, "refineInitiative", null);
__decorate([
    (0, common_1.Patch)(':id/roleDependent'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('role')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, initiative_dto_1.UpdateInitiativeDto]),
    __metadata("design:returntype", Promise)
], InitiativeController.prototype, "roleStatusUpdate", null);
exports.InitiativeController = InitiativeController = __decorate([
    (0, common_1.Controller)('initiatives'),
    __metadata("design:paramtypes", [initiative_service_1.InitiativeService])
], InitiativeController);
//# sourceMappingURL=initiative.controller.js.map