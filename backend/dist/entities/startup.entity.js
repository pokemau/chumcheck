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
exports.Startup = void 0;
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("./user.entity");
const capsule_proposal_entity_1 = require("./capsule-proposal.entity");
const qualification_status_enum_1 = require("./enums/qualification-status.enum");
const roadblock_entity_1 = require("./roadblock.entity");
const rns_entity_1 = require("./rns.entity");
const startup_readiness_level_entity_1 = require("./startup-readiness-level.entity");
const urat_question_answer_entity_1 = require("./urat-question-answer.entity");
const calculator_question_answer_entity_1 = require("./calculator-question-answer.entity");
const startup_waitlist_message_entity_1 = require("./startup-waitlist-message.entity");
let Startup = class Startup {
    id;
    name;
    user;
    qualificationStatus = qualification_status_enum_1.QualificationStatus.PENDING;
    dataPrivacy = false;
    links;
    groupName;
    universityName;
    eligibility = false;
    capsuleProposal;
    mentors = new core_1.Collection(this);
    datetimeDeleted;
    roadblocks = new core_1.Collection(this);
    members = new core_1.Collection(this);
    rns = new core_1.Collection(this);
    readinessLevels = new core_1.Collection(this);
    uratQuestionAnswers = new core_1.Collection(this);
    calculatorQuestionAnswers = new core_1.Collection(this);
    waitlistMessages = new core_1.Collection(this);
};
exports.Startup = Startup;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], Startup.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Startup.prototype, "name", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Startup.prototype, "user", void 0);
__decorate([
    (0, core_1.Enum)(() => qualification_status_enum_1.QualificationStatus),
    __metadata("design:type", Number)
], Startup.prototype, "qualificationStatus", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Startup.prototype, "dataPrivacy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Startup.prototype, "links", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Startup.prototype, "groupName", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Startup.prototype, "universityName", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Startup.prototype, "eligibility", void 0);
__decorate([
    (0, core_1.OneToOne)(() => capsule_proposal_entity_1.CapsuleProposal, (capsule) => capsule.startup, {
        nullable: true,
    }),
    __metadata("design:type", capsule_proposal_entity_1.CapsuleProposal)
], Startup.prototype, "capsuleProposal", void 0);
__decorate([
    (0, core_1.ManyToMany)(() => user_entity_1.User),
    __metadata("design:type", Object)
], Startup.prototype, "mentors", void 0);
__decorate([
    (0, core_1.Property)({ type: core_1.DateTimeType, nullable: true }),
    __metadata("design:type", Date)
], Startup.prototype, "datetimeDeleted", void 0);
__decorate([
    (0, core_1.OneToMany)(() => roadblock_entity_1.Roadblock, (roadblock) => roadblock.startup),
    __metadata("design:type", Object)
], Startup.prototype, "roadblocks", void 0);
__decorate([
    (0, core_1.ManyToMany)(() => user_entity_1.User),
    __metadata("design:type", Object)
], Startup.prototype, "members", void 0);
__decorate([
    (0, core_1.OneToMany)(() => rns_entity_1.Rns, (rns) => rns.startup),
    __metadata("design:type", Object)
], Startup.prototype, "rns", void 0);
__decorate([
    (0, core_1.OneToMany)(() => startup_readiness_level_entity_1.StartupReadinessLevel, (s) => s.startup),
    __metadata("design:type", Object)
], Startup.prototype, "readinessLevels", void 0);
__decorate([
    (0, core_1.OneToMany)(() => urat_question_answer_entity_1.UratQuestionAnswer, (answer) => answer.startup),
    __metadata("design:type", Object)
], Startup.prototype, "uratQuestionAnswers", void 0);
__decorate([
    (0, core_1.OneToMany)(() => calculator_question_answer_entity_1.CalculatorQuestionAnswer, (answer) => answer.startup),
    __metadata("design:type", Object)
], Startup.prototype, "calculatorQuestionAnswers", void 0);
__decorate([
    (0, core_1.OneToMany)(() => startup_waitlist_message_entity_1.StartupWaitlistMessage, (message) => message.startup),
    __metadata("design:type", Object)
], Startup.prototype, "waitlistMessages", void 0);
exports.Startup = Startup = __decorate([
    (0, core_1.Entity)({ tableName: 'startups' })
], Startup);
//# sourceMappingURL=startup.entity.js.map