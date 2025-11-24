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
exports.User = void 0;
const core_1 = require("@mikro-orm/core");
const role_enum_1 = require("./enums/role.enum");
const startup_entity_1 = require("./startup.entity");
const roadblock_entity_1 = require("./roadblock.entity");
const rns_entity_1 = require("./rns.entity");
let User = class User {
    id;
    email;
    hash;
    firstName;
    lastName;
    role = role_enum_1.Role.Startup;
    assignedRoadblocks = new core_1.Collection(this);
    startups = new core_1.Collection(this);
    startupsAsMember = new core_1.Collection(this);
    assignedRns = new core_1.Collection(this);
};
exports.User = User;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ hidden: true }),
    __metadata("design:type", String)
], User.prototype, "hash", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, core_1.Enum)(() => role_enum_1.Role),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, core_1.OneToMany)(() => roadblock_entity_1.Roadblock, (roadblock) => roadblock.assignee),
    __metadata("design:type", Object)
], User.prototype, "assignedRoadblocks", void 0);
__decorate([
    (0, core_1.OneToMany)(() => startup_entity_1.Startup, (startup) => startup.user),
    __metadata("design:type", Object)
], User.prototype, "startups", void 0);
__decorate([
    (0, core_1.ManyToMany)(() => startup_entity_1.Startup, (startup) => startup.members),
    __metadata("design:type", Object)
], User.prototype, "startupsAsMember", void 0);
__decorate([
    (0, core_1.OneToMany)(() => rns_entity_1.Rns, (rns) => rns.assignee),
    __metadata("design:type", Object)
], User.prototype, "assignedRns", void 0);
exports.User = User = __decorate([
    (0, core_1.Entity)({ tableName: 'users' })
], User);
//# sourceMappingURL=user.entity.js.map