"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const startup_module_1 = require("./startup/startup.module");
const readinesslevel_module_1 = require("./readinesslevel/readinesslevel.module");
const ai_module_1 = require("./ai/ai.module");
const nestjs_1 = require("@mikro-orm/nestjs");
const chat_history_module_1 = require("./chat_history/chat-history.module");
const admin_module_1 = require("./admin/admin.module");
const user_entity_1 = require("./entities/user.entity");
const startup_entity_1 = require("./entities/startup.entity");
const capsule_proposal_entity_1 = require("./entities/capsule-proposal.entity");
const urat_question_entity_1 = require("./entities/urat-question.entity");
const rna_chat_history_entity_1 = require("./entities/rna-chat-history.entity");
const app_controller_1 = require("./app.controller");
const roadblock_module_1 = require("./roadblock/roadblock.module");
const rna_module_1 = require("./rna/rna.module");
const rns_module_1 = require("./rns/rns.module");
const initiative_module_1 = require("./initiative/initiative.module");
const progress_module_1 = require("./progress/progress.module");
const overview_module_1 = require("./overview/overview.module");
const elevate_module_1 = require("./elevate/elevate.module");
const assessment_module_1 = require("./assessment/assessment.module");
const upload_module_1 = require("./upload/upload.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            nestjs_1.MikroOrmModule.forRoot(),
            nestjs_1.MikroOrmModule.forFeature({
                entities: [user_entity_1.User, startup_entity_1.Startup, capsule_proposal_entity_1.CapsuleProposal, urat_question_entity_1.UratQuestion, rna_chat_history_entity_1.RnaChatHistory],
            }),
            ai_module_1.AiModule,
            auth_module_1.AuthModule,
            startup_module_1.StartupModule,
            user_module_1.UserModule,
            readinesslevel_module_1.ReadinesslevelModule,
            rna_module_1.RnaModule,
            rns_module_1.RnsModule,
            initiative_module_1.InitiativeModule,
            roadblock_module_1.RoadblockModule,
            progress_module_1.ProgressModule,
            overview_module_1.OverviewModule,
            chat_history_module_1.ChatHistoryModule,
            elevate_module_1.ElevateModule,
            upload_module_1.UploadModule,
            admin_module_1.AdminModule,
            assessment_module_1.AssessmentModule,
        ],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map