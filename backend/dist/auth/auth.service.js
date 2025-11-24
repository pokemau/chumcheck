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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const postgresql_1 = require("@mikro-orm/postgresql");
const user_entity_1 = require("../entities/user.entity");
let AuthService = class AuthService {
    em;
    jwtService;
    configService;
    constructor(em, jwtService, configService) {
        this.em = em;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signup(dto) {
        try {
            const hash = await argon.hash(dto.password);
            const user = new user_entity_1.User();
            user.email = dto.email;
            user.hash = hash;
            user.firstName = dto.firstName;
            user.lastName = dto.lastName;
            await this.em.persistAndFlush(user);
            return this.signToken(user.id, user.email, user.role, user.firstName, user.lastName);
        }
        catch (error) {
            throw error;
        }
    }
    async signin(dto) {
        const user = await this.em.findOne(user_entity_1.User, { email: dto.email });
        if (!user)
            throw new common_1.ForbiddenException('User not found.');
        const passwordMatches = await argon.verify(user.hash, dto.password);
        if (!passwordMatches)
            throw new common_1.ForbiddenException('Wrong Password');
        return this.signToken(user.id, user.email, user.role, user.firstName, user.lastName);
    }
    async signToken(userId, email, role, firstName, lastName) {
        const payload = {
            sub: userId,
            email,
            role,
            firstName,
            lastName,
        };
        const secret = this.configService.get('JWT_SECRET');
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
            secret: secret,
        });
        return {
            access_token: token,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map