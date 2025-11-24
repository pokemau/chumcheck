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
exports.RnsController = void 0;
const common_1 = require("@nestjs/common");
const rns_service_1 = require("./rns.service");
const dto_1 = require("./dto");
let RnsController = class RnsController {
    rnsService;
    constructor(rnsService) {
        this.rnsService = rnsService;
    }
    async getStartupRns(startupId) {
        return await this.rnsService.getStartupRns(startupId);
    }
    async createRns(dto) {
        return await this.rnsService.createRns(dto);
    }
    async generateTasks(dto) {
        return await this.rnsService.generateTasks(dto);
    }
    async deleteRns(id) {
        return await this.rnsService.deleteRns(id);
    }
    async updateRns(id, dto) {
        return await this.rnsService.updateRns(id, dto);
    }
    async refineRnsDescription(id, dto) {
        return await this.rnsService.refineRnsDescription(id, dto.chatHistory, dto.latestPrompt);
    }
    async roleStatusUpdate(id, role, dto) {
        return this.rnsService.statusChange(id, role, dto);
    }
};
exports.RnsController = RnsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RnsController.prototype, "getStartupRns", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateRnsDto]),
    __metadata("design:returntype", Promise)
], RnsController.prototype, "createRns", null);
__decorate([
    (0, common_1.Post)('generate-tasks'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GenerateTasksDto]),
    __metadata("design:returntype", Promise)
], RnsController.prototype, "generateTasks", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RnsController.prototype, "deleteRns", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateRnsDto]),
    __metadata("design:returntype", Promise)
], RnsController.prototype, "updateRns", null);
__decorate([
    (0, common_1.Post)(':id/refine'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RnsController.prototype, "refineRnsDescription", null);
__decorate([
    (0, common_1.Patch)(':id/roleDependent'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('role')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, dto_1.UpdateRnsDto]),
    __metadata("design:returntype", Promise)
], RnsController.prototype, "roleStatusUpdate", null);
exports.RnsController = RnsController = __decorate([
    (0, common_1.Controller)('rns'),
    __metadata("design:paramtypes", [rns_service_1.RnsService])
], RnsController);
//# sourceMappingURL=rns.controller.js.map