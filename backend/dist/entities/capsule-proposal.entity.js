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
exports.CapsuleProposal = void 0;
const core_1 = require("@mikro-orm/core");
const startup_entity_1 = require("./startup.entity");
let CapsuleProposal = class CapsuleProposal {
    id;
    title;
    description;
    problemStatement;
    targetMarket;
    solutionDescription;
    objectives;
    historicalTimeline;
    competitiveAdvantageAnalysis;
    members;
    intellectualPropertyStatus;
    curriculumVitae;
    scope;
    methodology;
    aiAnalysisSummary;
    startup;
};
exports.CapsuleProposal = CapsuleProposal;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], CapsuleProposal.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], CapsuleProposal.prototype, "title", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], CapsuleProposal.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], CapsuleProposal.prototype, "problemStatement", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], CapsuleProposal.prototype, "targetMarket", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], CapsuleProposal.prototype, "solutionDescription", void 0);
__decorate([
    (0, core_1.Property)({ type: 'json' }),
    __metadata("design:type", Array)
], CapsuleProposal.prototype, "objectives", void 0);
__decorate([
    (0, core_1.Property)({ type: 'json' }),
    __metadata("design:type", Array)
], CapsuleProposal.prototype, "historicalTimeline", void 0);
__decorate([
    (0, core_1.Property)({ type: 'json' }),
    __metadata("design:type", Array)
], CapsuleProposal.prototype, "competitiveAdvantageAnalysis", void 0);
__decorate([
    (0, core_1.Property)({ type: 'json' }),
    __metadata("design:type", Array)
], CapsuleProposal.prototype, "members", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], CapsuleProposal.prototype, "intellectualPropertyStatus", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CapsuleProposal.prototype, "curriculumVitae", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], CapsuleProposal.prototype, "scope", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], CapsuleProposal.prototype, "methodology", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], CapsuleProposal.prototype, "aiAnalysisSummary", void 0);
__decorate([
    (0, core_1.OneToOne)(() => startup_entity_1.Startup, (startup) => startup.capsuleProposal, {
        owner: true,
    }),
    __metadata("design:type", startup_entity_1.Startup)
], CapsuleProposal.prototype, "startup", void 0);
exports.CapsuleProposal = CapsuleProposal = __decorate([
    (0, core_1.Entity)({ tableName: 'capsule_proposals' })
], CapsuleProposal);
//# sourceMappingURL=capsule-proposal.entity.js.map