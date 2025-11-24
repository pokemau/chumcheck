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
exports.AssessmentController = void 0;
const common_1 = require("@nestjs/common");
const assessment_service_1 = require("./assessment.service");
const assessment_dto_1 = require("./dto/assessment.dto");
let AssessmentController = class AssessmentController {
    assessmentService;
    constructor(assessmentService) {
        this.assessmentService = assessmentService;
    }
    async listTypes() {
        return this.assessmentService.listTypes();
    }
    async createType(body) {
        return this.assessmentService.createType(body.name);
    }
    async renameType(id, body) {
        await this.assessmentService.renameType(id, body.name);
        return { ok: true };
    }
    async deleteType(id) {
        await this.assessmentService.deleteType(id);
        return { ok: true };
    }
    async listFields(typeId) {
        return this.assessmentService.listFields(typeId);
    }
    async createField(body) {
        return this.assessmentService.createField(body.typeId, body.label, body.fieldType);
    }
    async updateField(id, body) {
        await this.assessmentService.updateField(id, body.label, body.fieldType);
        return { ok: true };
    }
    async deleteField(id) {
        await this.assessmentService.deleteField(id);
        return { ok: true };
    }
    async createStartupAssessment(body) {
        return this.assessmentService.createStartupAssessments(body.startupId, body.assessmentTypeIds);
    }
    async getStartupAssessments(startupId) {
        return this.assessmentService.getStartupAssessments(startupId);
    }
    async submitAssessment(submitDto) {
        console.log('=== RECEIVED SUBMIT REQUEST ===');
        console.log('DTO:', JSON.stringify(submitDto, null, 2));
        console.log('=== END RECEIVED DATA ===');
        await this.assessmentService.submitAssessment(submitDto);
    }
    async markAssessmentComplete(startupId, assessmentType) {
        await this.assessmentService.markAssessmentComplete(startupId, assessmentType);
    }
    async markAssessmentPending(startupId, assessmentType) {
        await this.assessmentService.markAssessmentPending(startupId, assessmentType);
    }
};
exports.AssessmentController = AssessmentController;
__decorate([
    (0, common_1.Get)('types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "listTypes", null);
__decorate([
    (0, common_1.Post)('types'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "createType", null);
__decorate([
    (0, common_1.Patch)('types/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "renameType", null);
__decorate([
    (0, common_1.Delete)('types/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "deleteType", null);
__decorate([
    (0, common_1.Get)('types/:id/fields'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "listFields", null);
__decorate([
    (0, common_1.Post)('fields'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "createField", null);
__decorate([
    (0, common_1.Patch)('fields/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "updateField", null);
__decorate([
    (0, common_1.Delete)('fields/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "deleteField", null);
__decorate([
    (0, common_1.Post)('startup-assessment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "createStartupAssessment", null);
__decorate([
    (0, common_1.Get)('startup/:startupId'),
    __param(0, (0, common_1.Param)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "getStartupAssessments", null);
__decorate([
    (0, common_1.Post)('submit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assessment_dto_1.SubmitAssessmentDto]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "submitAssessment", null);
__decorate([
    (0, common_1.Patch)('startup/:startupId/assessment/:assessmentType/complete'),
    __param(0, (0, common_1.Param)('startupId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('assessmentType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "markAssessmentComplete", null);
__decorate([
    (0, common_1.Patch)('startup/:startupId/assessment/:assessmentType/pending'),
    __param(0, (0, common_1.Param)('startupId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('assessmentType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "markAssessmentPending", null);
exports.AssessmentController = AssessmentController = __decorate([
    (0, common_1.Controller)('assessments'),
    __metadata("design:paramtypes", [assessment_service_1.AssessmentService])
], AssessmentController);
//# sourceMappingURL=assessment.controller.js.map