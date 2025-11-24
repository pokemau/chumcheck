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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const create_startup_dto_1 = require("./dto/create-startup.dto");
const update_startup_dto_1 = require("./dto/update-startup.dto");
const core_1 = require("@mikro-orm/core");
const activity_log_entity_1 = require("../entities/activity-log.entity");
const guard_1 = require("../auth/guard");
let AdminController = class AdminController {
    adminService;
    em;
    constructor(adminService, em) {
        this.adminService = adminService;
        this.em = em;
    }
    async recentActivity() {
        const items = await this.em.find(activity_log_entity_1.ActivityLog, {}, { orderBy: { createdAt: 'DESC' }, limit: 25 });
        return items.map((i) => ({
            date: i.createdAt.toISOString(),
            action: i.action,
            details: i.details
        }));
    }
    async getUsersJson() {
        const users = await this.adminService.getAllUsers();
        return users.sort((a, b) => a.id - b.id);
    }
    async getUserJson(id) {
        return this.adminService.getUserById(id);
    }
    async createUserJson(dto) {
        const user = await this.adminService.createUser(dto);
        return { message: 'User created', user };
    }
    async updateUserJson(id, dto) {
        const user = await this.adminService.updateUser(id, dto);
        return { message: 'User updated', user };
    }
    async deleteUserJson(id) {
        try {
            await this.adminService.deleteUser(id);
            return { message: 'User deleted' };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            throw e;
        }
    }
    async getStartupsJson() {
        const startups = await this.adminService.getAllStartups();
        return startups.sort((a, b) => a.id - b.id);
    }
    async getStartupJson(id) {
        return this.adminService.getStartupById(id);
    }
    async createStartupJson(dto) {
        const startup = await this.adminService.createStartup(dto);
        return { message: 'Startup created', startup };
    }
    async updateStartupJson(id, dto) {
        const startup = await this.adminService.updateStartup(id, dto);
        return { message: 'Startup updated', startup };
    }
    async deleteStartupJson(id) {
        try {
            await this.adminService.deleteStartup(id);
            return { message: 'Startup deleted' };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            throw e;
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('recent-activity'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "recentActivity", null);
__decorate([
    (0, common_1.Get)('users-json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsersJson", null);
__decorate([
    (0, common_1.Get)('users/:id-json'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUserJson", null);
__decorate([
    (0, common_1.Post)('users/create-json'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, stopAtFirstError: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createUserJson", null);
__decorate([
    (0, common_1.Post)('users/edit-json/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, stopAtFirstError: true })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUserJson", null);
__decorate([
    (0, common_1.Post)('users/delete-json/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUserJson", null);
__decorate([
    (0, common_1.Get)('startups-json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStartupsJson", null);
__decorate([
    (0, common_1.Get)('startups/:id-json'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStartupJson", null);
__decorate([
    (0, common_1.Post)('startups/create-json'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, stopAtFirstError: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_startup_dto_1.CreateStartupDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createStartupJson", null);
__decorate([
    (0, common_1.Post)('startups/edit-json/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, stopAtFirstError: true })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_startup_dto_1.UpdateStartupDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateStartupJson", null);
__decorate([
    (0, common_1.Post)('startups/delete-json/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteStartupJson", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.ManagerGuard),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService, core_1.EntityManager])
], AdminController);
//# sourceMappingURL=admin.controller.js.map