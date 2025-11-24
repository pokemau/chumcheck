"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupModule = void 0;
const common_1 = require("@nestjs/common");
const startup_service_1 = require("./startup.service");
const startup_controller_1 = require("./startup.controller");
const ai_module_1 = require("../ai/ai.module");
const nestjs_1 = require("@mikro-orm/nestjs");
const startup_entity_1 = require("../entities/startup.entity");
const user_entity_1 = require("../entities/user.entity");
const capsule_proposal_entity_1 = require("../entities/capsule-proposal.entity");
let StartupModule = class StartupModule {
};
exports.StartupModule = StartupModule;
exports.StartupModule = StartupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            ai_module_1.AiModule,
            nestjs_1.MikroOrmModule.forFeature({ entities: [startup_entity_1.Startup, user_entity_1.User, capsule_proposal_entity_1.CapsuleProposal] }),
        ],
        providers: [startup_service_1.StartupService],
        controllers: [startup_controller_1.StartupController],
        exports: [startup_service_1.StartupService],
    })
], StartupModule);
//# sourceMappingURL=startup.module.js.map