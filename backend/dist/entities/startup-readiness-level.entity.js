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
exports.StartupReadinessLevel = void 0;
const core_1 = require("@mikro-orm/core");
const startup_entity_1 = require("./startup.entity");
const readiness_level_entity_1 = require("./readiness-level.entity");
let StartupReadinessLevel = class StartupReadinessLevel {
    id;
    readinessLevel;
    startup;
    remark;
    createdAt = new Date();
    updatedAt = new Date();
};
exports.StartupReadinessLevel = StartupReadinessLevel;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], StartupReadinessLevel.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => readiness_level_entity_1.ReadinessLevel),
    __metadata("design:type", readiness_level_entity_1.ReadinessLevel)
], StartupReadinessLevel.prototype, "readinessLevel", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => startup_entity_1.Startup),
    __metadata("design:type", startup_entity_1.Startup)
], StartupReadinessLevel.prototype, "startup", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], StartupReadinessLevel.prototype, "remark", void 0);
__decorate([
    (0, core_1.Property)({ onCreate: () => new Date() }),
    __metadata("design:type", Object)
], StartupReadinessLevel.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], StartupReadinessLevel.prototype, "updatedAt", void 0);
exports.StartupReadinessLevel = StartupReadinessLevel = __decorate([
    (0, core_1.Entity)({ tableName: 'startups_readiness_level' })
], StartupReadinessLevel);
//# sourceMappingURL=startup-readiness-level.entity.js.map