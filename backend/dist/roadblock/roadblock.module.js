"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadblockModule = void 0;
const common_1 = require("@nestjs/common");
const roadblock_service_1 = require("./roadblock.service");
const roadblock_controller_1 = require("./roadblock.controller");
const ai_module_1 = require("../ai/ai.module");
let RoadblockModule = class RoadblockModule {
};
exports.RoadblockModule = RoadblockModule;
exports.RoadblockModule = RoadblockModule = __decorate([
    (0, common_1.Module)({
        imports: [ai_module_1.AiModule],
        providers: [roadblock_service_1.RoadblockService],
        controllers: [roadblock_controller_1.RoadblockController],
    })
], RoadblockModule);
//# sourceMappingURL=roadblock.module.js.map