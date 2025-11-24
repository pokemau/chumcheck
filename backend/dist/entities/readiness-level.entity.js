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
exports.ReadinessLevel = void 0;
const core_1 = require("@mikro-orm/core");
const readiness_type_enum_1 = require("./enums/readiness-type.enum");
const level_criterion_entity_1 = require("./level-criterion.entity");
let ReadinessLevel = class ReadinessLevel {
    id;
    level;
    name;
    readinessType;
    criteria = new core_1.Collection(this);
};
exports.ReadinessLevel = ReadinessLevel;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], ReadinessLevel.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], ReadinessLevel.prototype, "level", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], ReadinessLevel.prototype, "name", void 0);
__decorate([
    (0, core_1.Enum)(() => readiness_type_enum_1.ReadinessType),
    __metadata("design:type", String)
], ReadinessLevel.prototype, "readinessType", void 0);
__decorate([
    (0, core_1.OneToMany)(() => level_criterion_entity_1.LevelCriterion, (criterion) => criterion.readinessLevel),
    __metadata("design:type", Object)
], ReadinessLevel.prototype, "criteria", void 0);
exports.ReadinessLevel = ReadinessLevel = __decorate([
    (0, core_1.Entity)({ tableName: 'readiness_levels' })
], ReadinessLevel);
//# sourceMappingURL=readiness-level.entity.js.map