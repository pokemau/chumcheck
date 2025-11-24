"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevateModule = void 0;
const common_1 = require("@nestjs/common");
const elevate_service_1 = require("./elevate.service");
const elevate_controller_1 = require("./elevate.controller");
let ElevateModule = class ElevateModule {
};
exports.ElevateModule = ElevateModule;
exports.ElevateModule = ElevateModule = __decorate([
    (0, common_1.Module)({
        providers: [elevate_service_1.ElevateService],
        controllers: [elevate_controller_1.ElevateController],
    })
], ElevateModule);
//# sourceMappingURL=elevate.module.js.map