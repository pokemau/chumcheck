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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("../auth/auth.service");
const argon = require("argon2");
const startup_service_1 = require("../startup/startup.service");
const startup_entity_1 = require("../entities/startup.entity");
const core_1 = require("@mikro-orm/core");
const activity_log_entity_1 = require("../entities/activity-log.entity");
let AdminService = class AdminService {
    userService;
    authService;
    startupService;
    em;
    constructor(userService, authService, startupService, em) {
        this.userService = userService;
        this.authService = authService;
        this.startupService = startupService;
        this.em = em;
    }
    async log(action, details, actor) {
        const entry = this.em.create(activity_log_entity_1.ActivityLog, {
            action,
            details,
            actor,
            createdAt: new Date()
        });
        await this.em.persistAndFlush(entry);
    }
    async getAllUsers() {
        return this.userService.findAll();
    }
    async getUserById(id) {
        const user = await this.userService.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return user;
    }
    async createUser(createUserDto) {
        const { email, password, firstName, lastName, role } = createUserDto;
        const existing = await this.userService.findOneByEmail(email);
        if (existing) {
            const updateData = { firstName, lastName, role };
            if (password) {
                updateData.hash = await argon.hash(password);
            }
            const updated = await this.userService.update(existing.id, updateData);
            if (!updated)
                throw new common_1.InternalServerErrorException('Could not update existing user.');
            await this.log('Admin', `Updated existing user ${email}`, 'admin');
            return updated;
        }
        await this.authService.signup({ email, password, firstName: firstName ?? '', lastName: lastName ?? '' });
        const created = await this.userService.findOneByEmail(email);
        if (!created)
            throw new common_1.InternalServerErrorException('Could not retrieve created user.');
        if (created.role !== role) {
            const withRole = await this.userService.update(created.id, { role });
            if (!withRole)
                throw new common_1.InternalServerErrorException('Could not set role for created user.');
            await this.log('Admin', `Created user ${email} with role ${role}`, 'admin');
            return withRole;
        }
        await this.log('Admin', `Created user ${email}`, 'admin');
        return created;
    }
    async updateUser(id, updateUserDto) {
        await this.getUserById(id);
        const { password: newPassword, ...userData } = updateUserDto;
        const updateData = { ...userData };
        if (newPassword && newPassword.trim().length > 0) {
            updateData.hash = await argon.hash(newPassword);
        }
        const updatedUser = await this.userService.update(id, updateData);
        if (!updatedUser) {
            throw new common_1.InternalServerErrorException(`User with ID "${id}" could not be updated`);
        }
        await this.log('Admin', `Updated user ${updatedUser.email}`, 'admin');
        return updatedUser;
    }
    async deleteUser(id) {
        const user = await this.getUserById(id);
        const startupCount = await this.em.count(startup_entity_1.Startup, { user: id });
        if (startupCount > 0) {
            throw new common_1.BadRequestException(`Cannot delete user ${user.email} – referenced by ${startupCount} startup(s). Reassign or delete their startups first.`);
        }
        await this.userService.remove(id);
        await this.log('Admin', `Deleted user ${user.email}`, 'admin');
    }
    async getAllStartups() {
        return this.startupService.findAll();
    }
    async getStartupById(id) {
        const startup = await this.startupService.getStartupById(id);
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID "${id}" not found`);
        }
        return startup;
    }
    async createStartup(createStartupDto) {
        try {
            const s = await this.startupService.adminCreate(createStartupDto);
            await this.log('Admin', `Created startup ${s.name}`, 'admin');
            return s;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Could not create startup. ' + (error?.message ?? ''));
        }
    }
    async updateStartup(id, updateStartupDto) {
        await this.getStartupById(id);
        try {
            const updatedStartup = await this.startupService.update(id, updateStartupDto);
            if (!updatedStartup) {
                throw new common_1.InternalServerErrorException(`Startup with ID "${id}" could not be updated`);
            }
            await this.log('Admin', `Updated startup ${updatedStartup.name}`, 'admin');
            return updatedStartup;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Could not update startup. ' + (error?.message ?? ''));
        }
    }
    async deleteStartup(id) {
        const s = await this.getStartupById(id);
        await this.startupService.remove(id);
        await this.log('Admin', `Deleted startup ${s.name}`, 'admin');
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        startup_service_1.StartupService,
        core_1.EntityManager])
], AdminService);
//# sourceMappingURL=admin.service.js.map