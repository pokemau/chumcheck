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
exports.RnaController = void 0;
const common_1 = require("@nestjs/common");
const rna_service_1 = require("./rna.service");
const rna_dto_1 = require("./dto/rna.dto");
let RnaController = class RnaController {
    rnaService;
    constructor(rnaService) {
        this.rnaService = rnaService;
    }
    async create(dto) {
        return this.rnaService.create(dto);
    }
    async getStartupRna(startupId) {
        return await this.rnaService.getRNAbyId(startupId);
    }
    async update(id, dto) {
        return this.rnaService.update(id, dto);
    }
    async delete(id) {
        return this.rnaService.delete(id);
    }
    async generateTasks(id) {
        return await this.rnaService.generateRNA(id);
    }
    async checkIfAllReadinessTypesHaveRNA(id) {
        return await this.rnaService.checkIfAllReadinessTypesHaveRNA(id);
    }
    async refineRna(id, body) {
        return await this.rnaService.refineRna(id, body.chatHistory, body.latestPrompt);
    }
};
exports.RnaController = RnaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rna_dto_1.CreateStartupRnaDto]),
    __metadata("design:returntype", Promise)
], RnaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RnaController.prototype, "getStartupRna", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, rna_dto_1.UpdateStartupRnaDto]),
    __metadata("design:returntype", Promise)
], RnaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RnaController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/generate-rna'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RnaController.prototype, "generateTasks", null);
__decorate([
    (0, common_1.Get)(':id/check-complete'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RnaController.prototype, "checkIfAllReadinessTypesHaveRNA", null);
__decorate([
    (0, common_1.Post)(':id/refine'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RnaController.prototype, "refineRna", null);
exports.RnaController = RnaController = __decorate([
    (0, common_1.Controller)('rna'),
    __metadata("design:paramtypes", [rna_service_1.RnaService])
], RnaController);
//# sourceMappingURL=rna.controller.js.map