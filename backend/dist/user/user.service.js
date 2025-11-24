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
exports.UserService = void 0;
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
let UserService = class UserService {
    em;
    constructor(em) {
        this.em = em;
    }
    async findAll() {
        return await this.em.find(user_entity_1.User, {});
    }
    async findOneById(id) {
        return await this.em.findOne(user_entity_1.User, { id });
    }
    async findOneByEmail(email) {
        return await this.em.findOne(user_entity_1.User, { email });
    }
    async getUserByRole(userRole) {
        return await this.em.find(user_entity_1.User, {
            role: userRole,
        });
    }
    async getUserByString(query) {
        return await this.em.find(user_entity_1.User, {
            email: { $ilike: `%${query}%` },
        });
    }
    async update(id, data) {
        const user = await this.findOneById(id);
        if (!user) {
            return null;
        }
        this.em.assign(user, data);
        await this.em.flush();
        return user;
    }
    async remove(id) {
        const user = await this.findOneById(id);
        if (user) {
            await this.em.removeAndFlush(user);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], UserService);
//# sourceMappingURL=user.service.js.map