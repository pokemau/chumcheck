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
exports.StartupAssessment = void 0;
const core_1 = require("@mikro-orm/core");
const assessment_util_enum_1 = require("./enums/assessment-util.enum");
const assessment_type_entity_1 = require("./assessment-type.entity");
let StartupAssessment = class StartupAssessment {
    id;
    startupId;
    assessmentType;
    status;
};
exports.StartupAssessment = StartupAssessment;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], StartupAssessment.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], StartupAssessment.prototype, "startupId", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => assessment_type_entity_1.AssessmentType, { deleteRule: 'cascade' }),
    __metadata("design:type", assessment_type_entity_1.AssessmentType)
], StartupAssessment.prototype, "assessmentType", void 0);
__decorate([
    (0, core_1.Enum)(() => assessment_util_enum_1.AssessmentStatus),
    __metadata("design:type", Number)
], StartupAssessment.prototype, "status", void 0);
exports.StartupAssessment = StartupAssessment = __decorate([
    (0, core_1.Entity)({ tableName: "startup_assessments" })
], StartupAssessment);
//# sourceMappingURL=startup-assessment.entity.js.map