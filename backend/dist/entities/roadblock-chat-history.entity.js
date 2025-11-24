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
exports.RoadblockChatHistory = void 0;
const core_1 = require("@mikro-orm/core");
const roadblock_entity_1 = require("./roadblock.entity");
let RoadblockChatHistory = class RoadblockChatHistory {
    id;
    roadblock;
    role;
    content;
    createdAt = new Date();
    refinedDescription;
    refinedFix;
    constructor(data) {
        if (data) {
            Object.assign(this, data);
        }
    }
};
exports.RoadblockChatHistory = RoadblockChatHistory;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], RoadblockChatHistory.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => roadblock_entity_1.Roadblock, { deleteRule: 'cascade' }),
    __metadata("design:type", roadblock_entity_1.Roadblock)
], RoadblockChatHistory.prototype, "roadblock", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], RoadblockChatHistory.prototype, "role", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], RoadblockChatHistory.prototype, "content", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], RoadblockChatHistory.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], RoadblockChatHistory.prototype, "refinedDescription", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], RoadblockChatHistory.prototype, "refinedFix", void 0);
exports.RoadblockChatHistory = RoadblockChatHistory = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], RoadblockChatHistory);
//# sourceMappingURL=roadblock-chat-history.entity.js.map