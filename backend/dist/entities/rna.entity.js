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
exports.StartupRNA = void 0;
const core_1 = require("@mikro-orm/core");
const readiness_level_entity_1 = require("./readiness-level.entity");
const startup_entity_1 = require("./startup.entity");
let StartupRNA = class StartupRNA {
    id;
    readinessLevel;
    startup;
    isAiGenerated;
    rna;
    createdAt = new Date();
    updatedAt = new Date();
};
exports.StartupRNA = StartupRNA;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], StartupRNA.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => readiness_level_entity_1.ReadinessLevel, {
        fieldName: 'readiness_level_id',
    }),
    __metadata("design:type", readiness_level_entity_1.ReadinessLevel)
], StartupRNA.prototype, "readinessLevel", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => startup_entity_1.Startup, {
        fieldName: 'startup_id',
    }),
    __metadata("design:type", startup_entity_1.Startup)
], StartupRNA.prototype, "startup", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'is_ai_generated', type: 'boolean' }),
    __metadata("design:type", Boolean)
], StartupRNA.prototype, "isAiGenerated", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], StartupRNA.prototype, "rna", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'created_at' }),
    __metadata("design:type", Date)
], StartupRNA.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'updated_at', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], StartupRNA.prototype, "updatedAt", void 0);
exports.StartupRNA = StartupRNA = __decorate([
    (0, core_1.Entity)({ tableName: 'rna' })
], StartupRNA);
//# sourceMappingURL=rna.entity.js.map