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
exports.StartupController = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("../ai/ai.service");
const startup_service_1 = require("./startup.service");
const guard_1 = require("../auth/guard");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("@nestjs/common");
const update_startup_dto_1 = require("../admin/dto/update-startup.dto");
const dto_1 = require("./dto");
let StartupController = class StartupController {
    startupService;
    aiService;
    constructor(startupService, aiService) {
        this.startupService = startupService;
        this.aiService = aiService;
    }
    getStartups(req) {
        return this.startupService.getStartups(req.user.id);
    }
    async getReadinessLevelCriterionAnswers(startupId) {
        return this.startupService.getReadinessLevelCriterionAnswers(startupId);
    }
    async getStartupReadinessLevel(startupId) {
        return this.startupService.getStartupReadinessLevel(startupId);
    }
    async getAllStartups() {
        return await this.startupService.getAllStartups();
    }
    async getStartupsByUrat() {
        return await this.startupService.getPendingStartupsRankingByUrat();
    }
    async getStartupsByRubrics() {
        return await this.startupService.getQualifiedStartupsRankingByRubrics();
    }
    async applyStartup(dto, req) {
        const userId = req.user.id;
        const data = await this.startupService.create(dto, userId);
        return {
            message: 'yeahhhhhhhhhhhhh created startup',
        };
    }
    async addMemberToStartup(dto) {
        return await this.startupService.addMemberToStartup(dto);
    }
    async removeMemberFromStartup(userId, startupId) {
        return await this.startupService.removeMemberFromStartup(userId, startupId);
    }
    async getCapsuleProposal(file) {
    }
    async getStartupById(startupId) {
        return await this.startupService.getStartupById(startupId);
    }
    async getStartupAllowTasksById(startupId) {
        return true;
    }
    async getCalculatorFinalScores(startupId) {
        return await this.startupService.getCalculatorFinalScores(startupId);
    }
    async approveApplicant(startupId) {
        return await this.startupService.approveApplicant(startupId);
    }
    async waitlistApplicant(startupId, dto) {
        return await this.startupService.waitlistApplicant(startupId, dto);
    }
    async appointMentors(startupId, dto) {
        return await this.startupService.appointMentors(startupId, dto);
    }
    async markStartupComplete(startupId) {
        return await this.startupService.markComplete(startupId);
    }
    async changeMentor(startupId, dto) {
        return await this.startupService.changeMentor(startupId, dto);
    }
    async allowRNAs(startupId) {
        return this.startupService.allowRNAs(startupId);
    }
    async allowTasks(startupId) {
        return this.startupService.allowTasks(startupId);
    }
    async allowInitiatives(startupId) {
        return this.startupService.allowInitiatives(startupId);
    }
    async allowRoadblocks(startupId) {
        return this.startupService.allowRoadblocks(startupId);
    }
    async updateStartup(id, dto) {
        return await this.startupService.update(id, dto);
    }
    async reapplyStartup(id, dto, req) {
        return await this.startupService.updateCapsuleProposal(id, dto);
    }
};
exports.StartupController = StartupController;
__decorate([
    (0, common_1.Get)('/startups'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StartupController.prototype, "getStartups", null);
__decorate([
    (0, common_1.Get)('/criterion-answers'),
    __param(0, (0, common_1.Query)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getReadinessLevelCriterionAnswers", null);
__decorate([
    (0, common_1.Get)('/startup-readiness-level'),
    __param(0, (0, common_1.Query)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getStartupReadinessLevel", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getAllStartups", null);
__decorate([
    (0, common_1.Get)('/ranking-by-urat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getStartupsByUrat", null);
__decorate([
    (0, common_1.Get)('/ranking-by-rubrics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getStartupsByRubrics", null);
__decorate([
    (0, common_1.Post)('/apply'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.StartupApplicationDto, Object]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "applyStartup", null);
__decorate([
    (0, common_1.Post)('add-member'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "addMemberToStartup", null);
__decorate([
    (0, common_1.Delete)('remove-member/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "removeMemberFromStartup", null);
__decorate([
    (0, common_1.Post)('/parse-capsule-proposal'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('capsuleProposal')),
    __param(0, (0, common_2.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getCapsuleProposal", null);
__decorate([
    (0, common_1.Get)(':startupId'),
    __param(0, (0, common_1.Param)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getStartupById", null);
__decorate([
    (0, common_1.Get)(':startupId/allow-tasks'),
    __param(0, (0, common_1.Param)('startupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getStartupAllowTasksById", null);
__decorate([
    (0, common_1.Get)(':startupId/calculator-final-scores'),
    __param(0, (0, common_1.Param)('startupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "getCalculatorFinalScores", null);
__decorate([
    (0, common_1.Post)(':startupId/approve-applicant'),
    __param(0, (0, common_1.Param)('startupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "approveApplicant", null);
__decorate([
    (0, common_1.Patch)(':startupId/waitlist-applicant'),
    __param(0, (0, common_1.Param)('startupId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.WaitlistStartupDto]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "waitlistApplicant", null);
__decorate([
    (0, common_1.Post)(':startupId/appoint-mentors'),
    __param(0, (0, common_1.Param)('startupId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.AppointMentorsDto]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "appointMentors", null);
__decorate([
    (0, common_1.Patch)(':startupId/mark-complete'),
    __param(0, (0, common_1.Param)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "markStartupComplete", null);
__decorate([
    (0, common_1.Patch)(':startupId/change-mentor'),
    __param(0, (0, common_1.Param)('startupId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.ChangeMentorDto]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "changeMentor", null);
__decorate([
    (0, common_1.Get)(':startupId/allow-rnas'),
    __param(0, (0, common_1.Param)('startupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "allowRNAs", null);
__decorate([
    (0, common_1.Get)(':startupId/allow-tasks'),
    __param(0, (0, common_1.Param)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "allowTasks", null);
__decorate([
    (0, common_1.Get)(':startupId/allow-initiatives'),
    __param(0, (0, common_1.Param)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "allowInitiatives", null);
__decorate([
    (0, common_1.Get)(':startupId/allow-roadblocks'),
    __param(0, (0, common_1.Param)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "allowRoadblocks", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_startup_dto_1.UpdateStartupDto]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "updateStartup", null);
__decorate([
    (0, common_1.Patch)(':id/reapply'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.StartupApplicationDto, Object]),
    __metadata("design:returntype", Promise)
], StartupController.prototype, "reapplyStartup", null);
exports.StartupController = StartupController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('startups'),
    __metadata("design:paramtypes", [startup_service_1.StartupService,
        ai_service_1.AiService])
], StartupController);
//# sourceMappingURL=startup.controller.js.map