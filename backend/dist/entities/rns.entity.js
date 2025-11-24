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
exports.Rns = void 0;
const core_1 = require("@mikro-orm/core");
const startup_entity_1 = require("./startup.entity");
const user_entity_1 = require("./user.entity");
const rns_enum_1 = require("./enums/rns.enum");
const readiness_type_enum_1 = require("./enums/readiness-type.enum");
const readiness_level_entity_1 = require("./readiness-level.entity");
const utils_1 = require("../utils");
let Rns = class Rns {
    id;
    priorityNumber;
    clickedByMentor = false;
    clickedByStartup = false;
    description;
    targetLevel;
    isAiGenerated = false;
    status = rns_enum_1.RnsStatus.New;
    requestedStatus;
    approvalStatus;
    readinessType;
    startup;
    assignee;
    getTargetLevelScore() {
        const levels = (0, utils_1.getReadinessLevels)(this.readinessType);
        const matchingLevels = levels.filter((level) => Number(level.id) === Number(this.targetLevel.id));
        return matchingLevels.length > 0 ? Number(matchingLevels[0].level) : -1;
    }
};
exports.Rns = Rns;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], Rns.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Rns.prototype, "priorityNumber", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Rns.prototype, "clickedByMentor", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Rns.prototype, "clickedByStartup", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], Rns.prototype, "description", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => readiness_level_entity_1.ReadinessLevel),
    __metadata("design:type", readiness_level_entity_1.ReadinessLevel)
], Rns.prototype, "targetLevel", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Rns.prototype, "isAiGenerated", void 0);
__decorate([
    (0, core_1.Enum)(() => rns_enum_1.RnsStatus),
    __metadata("design:type", Number)
], Rns.prototype, "status", void 0);
__decorate([
    (0, core_1.Enum)(() => rns_enum_1.RnsStatus),
    __metadata("design:type", Number)
], Rns.prototype, "requestedStatus", void 0);
__decorate([
    (0, core_1.Property)({ default: 'Unchanged' }),
    __metadata("design:type", String)
], Rns.prototype, "approvalStatus", void 0);
__decorate([
    (0, core_1.Enum)(() => readiness_type_enum_1.ReadinessType),
    __metadata("design:type", String)
], Rns.prototype, "readinessType", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => startup_entity_1.Startup),
    __metadata("design:type", startup_entity_1.Startup)
], Rns.prototype, "startup", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Rns.prototype, "assignee", void 0);
exports.Rns = Rns = __decorate([
    (0, core_1.Entity)({ tableName: 'rns' })
], Rns);
//# sourceMappingURL=rns.entity.js.map