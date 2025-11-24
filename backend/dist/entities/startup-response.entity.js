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
exports.StartupResponse = void 0;
const core_1 = require("@mikro-orm/core");
const assessment_entity_1 = require("./assessment.entity");
let StartupResponse = class StartupResponse {
    id;
    startupId;
    assessment;
    answerValue;
    submittedAt = new Date();
};
exports.StartupResponse = StartupResponse;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], StartupResponse.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], StartupResponse.prototype, "startupId", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => assessment_entity_1.Assessment, { deleteRule: 'cascade' }),
    __metadata("design:type", assessment_entity_1.Assessment)
], StartupResponse.prototype, "assessment", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], StartupResponse.prototype, "answerValue", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], StartupResponse.prototype, "submittedAt", void 0);
exports.StartupResponse = StartupResponse = __decorate([
    (0, core_1.Entity)({ tableName: "startup_responses" })
], StartupResponse);
//# sourceMappingURL=startup-response.entity.js.map