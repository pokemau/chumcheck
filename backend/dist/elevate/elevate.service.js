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
exports.ElevateService = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const startup_entity_1 = require("../entities/startup.entity");
const elevate_log_entity_1 = require("../entities/elevate-log.entity");
const readiness_level_entity_1 = require("../entities/readiness-level.entity");
let ElevateService = class ElevateService {
    em;
    constructor(em) {
        this.em = em;
    }
    async elevate(dto) {
        const startup = await this.em.findOneOrFail(startup_entity_1.Startup, dto.startupId);
        const readinessLevel = await this.em.findOneOrFail(readiness_level_entity_1.ReadinessLevel, dto.readinessLevelId);
        const log = new elevate_log_entity_1.ElevateLogs();
        log.startup = startup;
        log.readinessLevel = readinessLevel;
        log.level = readinessLevel.level;
        this.em.persist(log);
        return await this.em.flush();
    }
    async getStartupElevateLogs(startupId) {
        const logs = await this.em.find(elevate_log_entity_1.ElevateLogs, { startup: startupId }, {
            orderBy: { createdAt: 'desc' },
            limit: 6,
            populate: ['readinessLevel'],
        });
        return logs.sort((a, b) => a.readinessLevel.readinessType.localeCompare(b.readinessLevel.readinessType));
    }
};
exports.ElevateService = ElevateService;
exports.ElevateService = ElevateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], ElevateService);
//# sourceMappingURL=elevate.service.js.map