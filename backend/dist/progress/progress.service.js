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
exports.ProgressService = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const initiative_entity_1 = require("../entities/initiative.entity");
const rns_entity_1 = require("../entities/rns.entity");
const roadblock_entity_1 = require("../entities/roadblock.entity");
const startup_readiness_level_entity_1 = require("../entities/startup-readiness-level.entity");
const rna_entity_1 = require("../entities/rna.entity");
const startup_entity_1 = require("../entities/startup.entity");
let ProgressService = class ProgressService {
    em;
    constructor(em) {
        this.em = em;
    }
    async getProgressReport(startupId) {
        const startup = await this.em.findOne(startup_entity_1.Startup, { id: startupId });
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${startup} does not exist!`);
        }
        const readinessLevels = await this.em.find(startup_readiness_level_entity_1.StartupReadinessLevel, { startup: { id: startupId } }, {
            populate: ['readinessLevel'],
        });
        const rna = await this.em.find(rna_entity_1.StartupRNA, { startup: { id: startupId } }, {
            populate: ['readinessLevel'],
        });
        const rns = await this.em.find(rns_entity_1.Rns, {
            startup: { id: startupId },
        }, {
            populate: ['targetLevel', 'assignee'],
            orderBy: { priorityNumber: 'ASC' },
        });
        const rnsWithInitiatives = await Promise.all(rns.map(async (r) => {
            const initiatives = await this.em.find(initiative_entity_1.Initiative, { rns: { id: r.id } }, {
                populate: ['assignee'],
                orderBy: { initiativeNumber: 'ASC' },
            });
            return {
                id: r.id,
                description: r.description,
                status: r.status,
                readinessType: r.readinessType,
                targetLevelId: r.targetLevel.id,
                targetLevelScore: r.getTargetLevelScore(),
                priorityNumber: r.priorityNumber,
                isAiGenerated: r.isAiGenerated,
                assignee: r.assignee
                    ? {
                        id: r.assignee.id,
                        firstName: r.assignee.firstName,
                        lastName: r.assignee.lastName,
                    }
                    : null,
                initiatives: initiatives.map((initiative) => ({
                    id: initiative.id,
                    initiativeNumber: initiative.initiativeNumber,
                    status: initiative.status,
                    isAiGenerated: initiative.isAiGenerated,
                    measures: initiative.measures,
                    targets: initiative.targets,
                    description: initiative.description,
                    assignee: initiative.assignee
                        ? {
                            id: initiative.assignee.id,
                            firstName: initiative.assignee.firstName,
                            lastName: initiative.assignee.lastName,
                        }
                        : null,
                })),
            };
        }));
        const roadblocks = await this.em.find(roadblock_entity_1.Roadblock, { startup: { id: startupId } }, {
            populate: ['assignee'],
        });
        return {
            startup,
            readinessLevels: readinessLevels.map((srl) => ({
                id: srl.id,
                readinessLevelId: srl.readinessLevel.id,
                readinessType: srl.readinessLevel.readinessType,
                level: srl.readinessLevel.level,
                name: srl.readinessLevel.name,
                remark: srl.remark,
                createdAt: srl.createdAt,
                updatedAt: srl.updatedAt,
            })),
            rna: rna.map((r) => ({
                id: r.id,
                readinessLevelId: r.readinessLevel.id,
                readinessType: r.readinessLevel.readinessType,
                readinessLevel: {
                    id: r.readinessLevel.id,
                    level: r.readinessLevel.level,
                    name: r.readinessLevel.name,
                },
                isAiGenerated: r.isAiGenerated,
                rna: r.rna,
                createdAt: r.createdAt,
                updatedAt: r.updatedAt,
            })),
            rns: rnsWithInitiatives,
            roadblocks: roadblocks.map((rb) => ({
                id: rb.id,
                description: rb.description,
                fix: rb.fix,
                status: rb.status,
                riskNumber: rb.riskNumber,
                isAiGenerated: rb.isAiGenerated,
                assignee: rb.assignee
                    ? {
                        id: rb.assignee.id,
                        firstName: rb.assignee.firstName,
                        lastName: rb.assignee.lastName,
                    }
                    : null,
                createdAt: rb.createdAt,
                updatedAt: rb.updatedAt,
            })),
        };
    }
    async getInitiavesByns(rnsId) {
        const rns = await this.em.findOne(rns_entity_1.Rns, { id: rnsId });
        if (!rns) {
            throw new common_1.NotFoundException(`RNS with ID ${rnsId} does not exist!`);
        }
        const initiatives = await this.em.find(initiative_entity_1.Initiative, { rns: { id: rnsId } }, {
            populate: ['assignee', 'startup'],
            orderBy: { initiativeNumber: 'ASC' },
        });
        return initiatives.map((initiative) => ({
            id: initiative.id,
            initiativeNumber: initiative.initiativeNumber,
            status: initiative.status,
            isAiGenerated: initiative.isAiGenerated,
            description: initiative.description,
            measures: initiative.measures,
            targets: initiative.targets,
            remarks: initiative.remarks,
            startup: {
                id: initiative.startup.id,
                name: initiative.startup.name,
            },
            assignee: initiative.assignee
                ? {
                    id: initiative.assignee.id,
                    firstName: initiative.assignee.firstName,
                    lastName: initiative.assignee.lastName,
                }
                : null,
            createdAt: initiative.createdAt,
            updatedAt: initiative.updatedAt,
        }));
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], ProgressService);
//# sourceMappingURL=progress.service.js.map