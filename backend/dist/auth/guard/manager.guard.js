"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerGuard = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../../entities/enums/role.enum");
let ManagerGuard = class ManagerGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user || (user.role !== role_enum_1.Role.Manager && user.role !== 'Manager as Mentor')) {
            throw new common_1.ForbiddenException('Managers only');
        }
        return true;
    }
};
exports.ManagerGuard = ManagerGuard;
exports.ManagerGuard = ManagerGuard = __decorate([
    (0, common_1.Injectable)()
], ManagerGuard);
//# sourceMappingURL=manager.guard.js.map