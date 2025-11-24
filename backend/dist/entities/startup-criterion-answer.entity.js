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
exports.StartupCriterionAnswer = void 0;
const core_1 = require("@mikro-orm/core");
const startup_entity_1 = require("./startup.entity");
const level_criterion_entity_1 = require("./level-criterion.entity");
let StartupCriterionAnswer = class StartupCriterionAnswer {
    id;
    score;
    remark;
    criterion;
    startup;
    createdAt = new Date();
    updatedAt = new Date();
};
exports.StartupCriterionAnswer = StartupCriterionAnswer;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], StartupCriterionAnswer.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], StartupCriterionAnswer.prototype, "score", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], StartupCriterionAnswer.prototype, "remark", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => level_criterion_entity_1.LevelCriterion),
    __metadata("design:type", level_criterion_entity_1.LevelCriterion)
], StartupCriterionAnswer.prototype, "criterion", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => startup_entity_1.Startup),
    __metadata("design:type", startup_entity_1.Startup)
], StartupCriterionAnswer.prototype, "startup", void 0);
__decorate([
    (0, core_1.Property)({ onCreate: () => new Date() }),
    __metadata("design:type", Object)
], StartupCriterionAnswer.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], StartupCriterionAnswer.prototype, "updatedAt", void 0);
exports.StartupCriterionAnswer = StartupCriterionAnswer = __decorate([
    (0, core_1.Entity)({ tableName: 'startups_criterion_answers' }),
    (0, core_1.Unique)({ properties: ['startup', 'criterion'] })
], StartupCriterionAnswer);
//# sourceMappingURL=startup-criterion-answer.entity.js.map