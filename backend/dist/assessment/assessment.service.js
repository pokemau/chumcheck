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
exports.AssessmentService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const startup_assessment_entity_1 = require("../entities/startup-assessment.entity");
const assessment_entity_1 = require("../entities/assessment.entity");
const startup_response_entity_1 = require("../entities/startup-response.entity");
const assessment_type_entity_1 = require("../entities/assessment-type.entity");
const assessment_util_enum_1 = require("../entities/enums/assessment-util.enum");
let AssessmentService = class AssessmentService {
    em;
    constructor(em) {
        this.em = em;
    }
    async listTypes() {
        const list = await this.em.find(assessment_type_entity_1.AssessmentType, {});
        return list.map(t => ({ id: t.id, name: t.type }));
    }
    async createType(name) {
        const existing = await this.em.findOne(assessment_type_entity_1.AssessmentType, { type: name });
        if (existing)
            throw new common_1.BadRequestException('Type already exists');
        const t = this.em.create(assessment_type_entity_1.AssessmentType, { type: name });
        await this.em.persistAndFlush(t);
        return { id: t.id, name: t.type };
    }
    async renameType(id, name) {
        const t = await this.em.findOne(assessment_type_entity_1.AssessmentType, { id });
        if (!t)
            throw new common_1.NotFoundException('Type not found');
        t.type = name;
        await this.em.persistAndFlush(t);
    }
    async deleteType(id) {
        const em = this.em.fork();
        const t = await em.findOne(assessment_type_entity_1.AssessmentType, { id });
        if (!t)
            throw new common_1.NotFoundException('Type not found');
        const fields = await em.find(assessment_entity_1.Assessment, { assessmentType: t });
        for (const f of fields)
            em.remove(f);
        await em.removeAndFlush(t);
    }
    async listFields(typeId) {
        const t = await this.em.findOne(assessment_type_entity_1.AssessmentType, { id: typeId });
        if (!t)
            throw new common_1.NotFoundException('Type not found');
        const fields = await this.em.find(assessment_entity_1.Assessment, { assessmentType: t });
        return fields.map(f => ({ id: f.assessment_id, label: f.description, fieldType: f.answerType }));
    }
    async createField(typeId, label, fieldType) {
        const t = await this.em.findOne(assessment_type_entity_1.AssessmentType, { id: typeId });
        if (!t)
            throw new common_1.NotFoundException('Type not found');
        const f = this.em.create(assessment_entity_1.Assessment, { assessmentType: t, description: label, answerType: fieldType });
        await this.em.persistAndFlush(f);
        return { id: f.assessment_id };
    }
    async updateField(fieldId, label, fieldType) {
        const f = await this.em.findOne(assessment_entity_1.Assessment, { assessment_id: fieldId });
        if (!f)
            throw new common_1.NotFoundException('Field not found');
        if (typeof label === 'string')
            f.description = label;
        if (typeof fieldType === 'number')
            f.answerType = fieldType;
        await this.em.persistAndFlush(f);
    }
    async deleteField(fieldId) {
        const f = await this.em.findOne(assessment_entity_1.Assessment, { assessment_id: fieldId });
        if (!f)
            throw new common_1.NotFoundException('Field not found');
        await this.em.removeAndFlush(f);
    }
    async getStartupAssessments(startupId) {
        const startupAssessments = await this.em.find(startup_assessment_entity_1.StartupAssessment, { startupId }, { populate: ['assessmentType'] });
        const groupedAssessments = new Map();
        for (const sa of startupAssessments) {
            const assessmentFields = await this.em.find(assessment_entity_1.Assessment, {
                assessmentType: sa.assessmentType,
            });
            const responses = await this.em.find(startup_response_entity_1.StartupResponse, {
                startupId,
                assessment: { assessment_id: { $in: assessmentFields.map(af => af.assessment_id) } },
            });
            const fields = assessmentFields.map(field => {
                const response = responses.find(r => r.assessment.assessment_id === field.assessment_id);
                return {
                    id: field.assessment_id.toString(),
                    description: field.description,
                    type: assessment_util_enum_1.AssessmentAnswerType[field.answerType],
                    answer: response?.answerValue || '',
                    ...(field.answerType === assessment_util_enum_1.AssessmentAnswerType.File && response?.answerValue && {
                        fileUrl: response.answerValue
                    })
                };
            });
            groupedAssessments.set(sa.assessmentType.type, {
                name: sa.assessmentType.type,
                assessmentStatus: assessment_util_enum_1.AssessmentStatus[sa.status],
                assessmentFields: fields,
            });
        }
        return Array.from(groupedAssessments.values());
    }
    async submitAssessment(submitDto) {
        const em = this.em.fork();
        try {
            console.log('=== SUBMIT ASSESSMENT SERVICE ===');
            console.log('Received DTO:', JSON.stringify(submitDto, null, 2));
            const assessmentType = await em.findOne(assessment_type_entity_1.AssessmentType, {
                type: submitDto.assessmentName
            });
            if (!assessmentType) {
                throw new common_1.BadRequestException(`Assessment type "${submitDto.assessmentName}" not found`);
            }
            const startupAssessment = await em.findOne(startup_assessment_entity_1.StartupAssessment, {
                startupId: submitDto.startupId,
                assessmentType: assessmentType,
            });
            if (!startupAssessment) {
                throw new common_1.BadRequestException('Assessment not assigned to this startup');
            }
            const requiredAssessments = await em.find(assessment_entity_1.Assessment, {
                assessmentType: assessmentType,
            });
            console.log('Required assessments:', requiredAssessments.map(a => ({ id: a.assessment_id, desc: a.description })));
            for (const response of submitDto.responses) {
                const assessment = requiredAssessments.find(a => a.assessment_id.toString() === response.assessmentId);
                if (!assessment) {
                    console.warn(`Assessment field ${response.assessmentId} not found, skipping`);
                    continue;
                }
                console.log(`Processing response for assessment ${response.assessmentId}:`, response.answerValue);
                const existingResponse = await em.findOne(startup_response_entity_1.StartupResponse, {
                    startupId: submitDto.startupId,
                    assessment: assessment,
                });
                if (existingResponse) {
                    existingResponse.answerValue = response.answerValue;
                    await em.persist(existingResponse);
                    console.log('Updated existing response');
                }
                else {
                    const newResponse = em.create(startup_response_entity_1.StartupResponse, {
                        startupId: submitDto.startupId,
                        assessment: assessment,
                        answerValue: response.answerValue,
                    });
                    await em.persist(newResponse);
                    console.log('Created new response');
                }
            }
            await em.flush();
            console.log('=== SUBMIT COMPLETE ===');
        }
        catch (error) {
            console.error('Error submitting assessment:', error);
            throw error;
        }
    }
    async markAssessmentComplete(startupId, assessmentType) {
        const em = this.em.fork();
        try {
            const assessmentTypeEntity = await em.findOne(assessment_type_entity_1.AssessmentType, {
                type: assessmentType
            });
            if (!assessmentTypeEntity) {
                throw new common_1.BadRequestException('Invalid assessment type');
            }
            const startupAssessment = await em.findOne(startup_assessment_entity_1.StartupAssessment, {
                startupId,
                assessmentType: assessmentTypeEntity,
            });
            if (!startupAssessment) {
                throw new common_1.BadRequestException('Assessment not found for startup');
            }
            startupAssessment.status = assessment_util_enum_1.AssessmentStatus.Completed;
            await em.persist(startupAssessment);
            await em.flush();
        }
        catch (error) {
            console.error('Error marking assessment as complete:', error);
            throw error;
        }
    }
    async markAssessmentPending(startupId, assessmentType) {
        const em = this.em.fork();
        try {
            const assessmentTypeEntity = await em.findOne(assessment_type_entity_1.AssessmentType, {
                type: assessmentType
            });
            if (!assessmentTypeEntity) {
                throw new common_1.BadRequestException('Invalid assessment type');
            }
            const startupAssessment = await em.findOne(startup_assessment_entity_1.StartupAssessment, {
                startupId,
                assessmentType: assessmentTypeEntity,
            });
            if (!startupAssessment) {
                throw new common_1.BadRequestException('Assessment not found for startup');
            }
            startupAssessment.status = assessment_util_enum_1.AssessmentStatus.Pending;
            await em.persist(startupAssessment);
            await em.flush();
        }
        catch (error) {
            console.error('Error marking assessment as pending:', error);
            throw error;
        }
    }
    async createStartupAssessments(startupId, assessmentTypeIds) {
        if (!Array.isArray(assessmentTypeIds) || assessmentTypeIds.length === 0) {
            throw new common_1.BadRequestException('assessmentTypeIds must be a non-empty array');
        }
        const ids = [];
        for (const assessmentTypeId of assessmentTypeIds) {
            const existing = await this.em.findOne(startup_assessment_entity_1.StartupAssessment, { startupId, assessmentType: assessmentTypeId });
            if (existing)
                continue;
            const assessmentType = await this.em.findOne(assessment_type_entity_1.AssessmentType, { id: assessmentTypeId });
            if (!assessmentType)
                continue;
            const sa = this.em.create(startup_assessment_entity_1.StartupAssessment, {
                startupId,
                assessmentType,
                status: assessment_util_enum_1.AssessmentStatus.Pending
            });
            await this.em.persistAndFlush(sa);
            ids.push(sa.id);
        }
        return { ids };
    }
};
exports.AssessmentService = AssessmentService;
exports.AssessmentService = AssessmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], AssessmentService);
//# sourceMappingURL=assessment.service.js.map