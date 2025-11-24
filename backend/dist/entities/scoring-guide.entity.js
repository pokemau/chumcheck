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
exports.ScoringGuide = void 0;
const core_1 = require("@mikro-orm/core");
const readiness_level_entity_1 = require("./readiness-level.entity");
let ScoringGuide = class ScoringGuide {
    id;
    readinessLevel;
    description;
};
exports.ScoringGuide = ScoringGuide;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], ScoringGuide.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => readiness_level_entity_1.ReadinessLevel),
    __metadata("design:type", readiness_level_entity_1.ReadinessLevel)
], ScoringGuide.prototype, "readinessLevel", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], ScoringGuide.prototype, "description", void 0);
exports.ScoringGuide = ScoringGuide = __decorate([
    (0, core_1.Entity)({ tableName: 'scoring_guide' })
], ScoringGuide);
//# sourceMappingURL=scoring-guide.entity.js.map