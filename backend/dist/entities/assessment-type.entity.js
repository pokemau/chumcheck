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
exports.AssessmentType = void 0;
const core_1 = require("@mikro-orm/core");
const assessment_entity_1 = require("./assessment.entity");
const startup_assessment_entity_1 = require("./startup-assessment.entity");
let AssessmentType = class AssessmentType {
    id;
    type;
    assessments = new core_1.Collection(this);
    startupAssessments = new core_1.Collection(this);
};
exports.AssessmentType = AssessmentType;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], AssessmentType.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'type' }),
    __metadata("design:type", String)
], AssessmentType.prototype, "type", void 0);
__decorate([
    (0, core_1.OneToMany)(() => assessment_entity_1.Assessment, a => a.assessmentType),
    __metadata("design:type", Object)
], AssessmentType.prototype, "assessments", void 0);
__decorate([
    (0, core_1.OneToMany)(() => startup_assessment_entity_1.StartupAssessment, sa => sa.assessmentType),
    __metadata("design:type", Object)
], AssessmentType.prototype, "startupAssessments", void 0);
exports.AssessmentType = AssessmentType = __decorate([
    (0, core_1.Entity)({ tableName: "assessment_types" })
], AssessmentType);
//# sourceMappingURL=assessment-type.entity.js.map