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
exports.ElevateLogs = void 0;
const core_1 = require("@mikro-orm/core");
const startup_entity_1 = require("./startup.entity");
const readiness_level_entity_1 = require("./readiness-level.entity");
let ElevateLogs = class ElevateLogs {
    id;
    createdAt;
    level;
    startup;
    readinessLevel;
};
exports.ElevateLogs = ElevateLogs;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], ElevateLogs.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ onCreate: () => new Date() }),
    __metadata("design:type", Date)
], ElevateLogs.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], ElevateLogs.prototype, "level", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => startup_entity_1.Startup),
    __metadata("design:type", startup_entity_1.Startup)
], ElevateLogs.prototype, "startup", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => readiness_level_entity_1.ReadinessLevel),
    __metadata("design:type", readiness_level_entity_1.ReadinessLevel)
], ElevateLogs.prototype, "readinessLevel", void 0);
exports.ElevateLogs = ElevateLogs = __decorate([
    (0, core_1.Entity)({ tableName: 'elevate_logs' })
], ElevateLogs);
//# sourceMappingURL=elevate-log.entity.js.map