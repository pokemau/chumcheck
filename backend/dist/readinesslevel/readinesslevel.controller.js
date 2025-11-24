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
exports.ReadinesslevelController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const readinesslevel_service_1 = require("./readinesslevel.service");
const guard_1 = require("../auth/guard");
let ReadinesslevelController = class ReadinesslevelController {
    readinessLevelService;
    constructor(readinessLevelService) {
        this.readinessLevelService = readinessLevelService;
    }
    async getUratQuestions() {
        return await this.readinessLevelService.getUratQuestions();
    }
    async getCalculatorQuestions() {
        return await this.readinessLevelService.getCalculatorQuestions();
    }
    async getReadinessLevels() {
        return await this.readinessLevelService.getReadinessLevels();
    }
    async getReadinessLevelCriterion() {
        return await this.readinessLevelService.getReadinessLevelCriterion();
    }
    async createUratQuestionAnswers(dto) {
        return await this.readinessLevelService.createUratQuestionAnswers(dto);
    }
    async createCalculatorQuestionAnswers(dto) {
        return await this.readinessLevelService.createCalculatorQuestionAnswers(dto);
    }
    async getUratQuestionAnswers(startupId) {
        return await this.readinessLevelService.getUratQuestionAnswers(startupId);
    }
    async getStartupReadinessLevels(startupId) {
        return await this.readinessLevelService.getStartupReadinessLevel(startupId);
    }
    async updateUratQuestionAnswer(id, dto) {
        return await this.readinessLevelService.updateUratQuestionAnswer(id, dto);
    }
    async updateCalculatorQuestionAnswer(id, dto) {
        return await this.readinessLevelService.updateCalculatorQuestionAnswer(id, dto);
    }
};
exports.ReadinesslevelController = ReadinesslevelController;
__decorate([
    (0, common_1.Get)('/urat-questions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReadinesslevelController.prototype, "getUratQuestions", null);
__decorate([
    (0, common_1.Get)('/calculator-questions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReadinesslevelController.prototype, "getCalculatorQuestions", null);
__decorate([
    (0, common_1.Get)('/readiness-levels'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReadinesslevelController.prototype, "getReadinessLevels", null);
__decorate([
    (0, common_1.Get)('/criterion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReadinesslevelController.prototype, "getReadinessLevelCriterion", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)('/urat-question-answers/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UratQuestionAnswerDto]),
    __metadata("design:returntype", Promise)
], ReadinesslevelController.prototype, "createUratQuestionAnswers", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)('/calculator-question-answers/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CalculatorQuestionAnswerDto]),
    __metadata("design:returntype", Promise)
], ReadinesslevelController.prototype, "createCalculatorQuestionAnswers", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Get)('urat-question-answers'),
    __param(0, (0, common_1.Query)('startupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReadinesslevelController.prototype, "getUratQuestionAnswers", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Get)('readiness-level'),
    __param(0, (0, common_1.Query)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReadinesslevelController.prototype, "getStartupReadinessLevels", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Patch)('/urat-question-answers/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ReadinesslevelController.prototype, "updateUratQuestionAnswer", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Patch)('/calculator-question-answers/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ReadinesslevelController.prototype, "updateCalculatorQuestionAnswer", null);
exports.ReadinesslevelController = ReadinesslevelController = __decorate([
    (0, common_1.Controller)('readinesslevel'),
    __metadata("design:paramtypes", [readinesslevel_service_1.ReadinesslevelService])
], ReadinesslevelController);
//# sourceMappingURL=readinesslevel.controller.js.map