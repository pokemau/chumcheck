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
exports.Roadblock = void 0;
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("./user.entity");
const startup_entity_1 = require("./startup.entity");
const rns_enum_1 = require("./enums/rns.enum");
let Roadblock = class Roadblock {
    id;
    assignee;
    startup;
    isAiGenerated;
    status;
    requestedStatus;
    approvalStatus;
    riskNumber;
    description;
    fix;
    createdAt;
    updatedAt = new Date();
    clickedByMentor = false;
    clickedByStartup = false;
};
exports.Roadblock = Roadblock;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], Roadblock.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Roadblock.prototype, "assignee", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => startup_entity_1.Startup),
    __metadata("design:type", startup_entity_1.Startup)
], Roadblock.prototype, "startup", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Roadblock.prototype, "isAiGenerated", void 0);
__decorate([
    (0, core_1.Enum)(() => rns_enum_1.RnsStatus),
    __metadata("design:type", Number)
], Roadblock.prototype, "status", void 0);
__decorate([
    (0, core_1.Enum)(() => rns_enum_1.RnsStatus),
    __metadata("design:type", Number)
], Roadblock.prototype, "requestedStatus", void 0);
__decorate([
    (0, core_1.Property)({ default: 'Unchanged' }),
    __metadata("design:type", String)
], Roadblock.prototype, "approvalStatus", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Roadblock.prototype, "riskNumber", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], Roadblock.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], Roadblock.prototype, "fix", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'datetime_created', onCreate: () => new Date() }),
    __metadata("design:type", Date)
], Roadblock.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'datetime_updated', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Roadblock.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Roadblock.prototype, "clickedByMentor", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Roadblock.prototype, "clickedByStartup", void 0);
exports.Roadblock = Roadblock = __decorate([
    (0, core_1.Entity)({ tableName: 'roadblocks' })
], Roadblock);
//# sourceMappingURL=roadblock.entity.js.map