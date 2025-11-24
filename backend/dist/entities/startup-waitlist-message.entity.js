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
exports.StartupWaitlistMessage = void 0;
const core_1 = require("@mikro-orm/core");
const startup_entity_1 = require("./startup.entity");
const user_entity_1 = require("./user.entity");
let StartupWaitlistMessage = class StartupWaitlistMessage {
    id;
    startup;
    manager;
    message;
    createdAt;
};
exports.StartupWaitlistMessage = StartupWaitlistMessage;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], StartupWaitlistMessage.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => startup_entity_1.Startup),
    __metadata("design:type", startup_entity_1.Startup)
], StartupWaitlistMessage.prototype, "startup", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], StartupWaitlistMessage.prototype, "manager", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], StartupWaitlistMessage.prototype, "message", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', defaultRaw: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], StartupWaitlistMessage.prototype, "createdAt", void 0);
exports.StartupWaitlistMessage = StartupWaitlistMessage = __decorate([
    (0, core_1.Entity)({ tableName: 'startup_waitlist_messages' })
], StartupWaitlistMessage);
//# sourceMappingURL=startup-waitlist-message.entity.js.map