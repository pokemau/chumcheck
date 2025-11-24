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
exports.StartupService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const startup_entity_1 = require("../entities/startup.entity");
const user_entity_1 = require("../entities/user.entity");
const role_enum_1 = require("../entities/enums/role.enum");
const startup_criterion_answer_entity_1 = require("../entities/startup-criterion-answer.entity");
const readiness_type_enum_1 = require("../entities/enums/readiness-type.enum");
const readiness_level_entity_1 = require("../entities/readiness-level.entity");
const urat_question_answer_entity_1 = require("../entities/urat-question-answer.entity");
const qualification_status_enum_1 = require("../entities/enums/qualification-status.enum");
const calculator_question_answer_entity_1 = require("../entities/calculator-question-answer.entity");
const startup_readiness_level_entity_1 = require("../entities/startup-readiness-level.entity");
const rna_entity_1 = require("../entities/rna.entity");
const capsule_proposal_entity_1 = require("../entities/capsule-proposal.entity");
const startup_waitlist_message_entity_1 = require("../entities/startup-waitlist-message.entity");
const ai_service_1 = require("../ai/ai.service");
let StartupService = class StartupService {
    em;
    aiService;
    constructor(em, aiService) {
        this.em = em;
        this.aiService = aiService;
    }
    async getStartups(userId) {
        const user = await this.em.findOne(user_entity_1.User, { id: userId });
        if (!user)
            throw new common_1.NotFoundException(`User with ID ${userId} does not exist`);
        switch (user.role) {
            case role_enum_1.Role.Startup:
                return await this.em.find(startup_entity_1.Startup, { user: userId }, {
                    populate: [
                        'user',
                        'members',
                        'capsuleProposal',
                        'mentors',
                        'readinessLevels.readinessLevel',
                        'uratQuestionAnswers.uratQuestion',
                        'calculatorQuestionAnswers.question',
                        'waitlistMessages',
                    ],
                });
            case role_enum_1.Role.Mentor:
                return await this.em.find(startup_entity_1.Startup, { mentors: { id: userId } }, { populate: ['mentors', 'capsuleProposal'] });
            case role_enum_1.Role.Manager:
                return await this.em.findAll(startup_entity_1.Startup, {
                    populate: ['user', 'mentors', 'members', 'capsuleProposal'],
                });
        }
    }
    async findAll() {
        return this.em.findAll(startup_entity_1.Startup, {
            populate: ['user', 'mentors', 'members', 'capsuleProposal'],
        });
    }
    async getAllStartups() {
        const t = await this.em.find(startup_entity_1.Startup, {}, {
            populate: [
                'user',
                'members',
                'capsuleProposal',
                'waitlistMessages',
                'waitlistMessages.manager',
                'mentors',
            ],
        });
        t.forEach((startup, index) => {
            console.log(`Startup ${index} (ID: ${startup.id}):`);
            if (startup.capsuleProposal) {
                console.log('  capsuleProposal.members:', startup.capsuleProposal.members);
            }
            else {
                console.log('  No capsuleProposal found');
            }
        });
        return t;
    }
    async getStartupById(startupId) {
        const startup = await this.em.findOne(startup_entity_1.Startup, { id: startupId }, { populate: ['user', 'members', 'capsuleProposal', 'waitlistMessages'] });
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} does not exist!`);
        }
        return startup;
    }
    async create(dto, userId) {
        return this.em.transactional(async () => {
            const user = await this.em.findOne(user_entity_1.User, { id: userId });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${userId} does not exist.`);
            }
            const startup = this.em.create(startup_entity_1.Startup, {
                name: dto.title,
                user: user,
                qualificationStatus: qualification_status_enum_1.QualificationStatus.PENDING,
                dataPrivacy: true,
                eligibility: true,
            });
            await this.em.persistAndFlush(startup);
            await this.createStartupProposal(startup, dto);
            return startup;
        });
    }
    async createStartupProposal(startup, dto) {
        try {
            const aiAnalysisSummary = await this.aiService.generateStartupAnalysisSummary(dto);
            if (startup.capsuleProposal) {
                const proposal = startup.capsuleProposal;
                proposal.title = dto.title;
                proposal.description = dto.description;
                proposal.problemStatement = dto.problemStatement;
                proposal.targetMarket = dto.targetMarket;
                proposal.solutionDescription = dto.solutionDescription;
                proposal.objectives = dto.objectives ?? [];
                proposal.historicalTimeline = dto.historicalTimeline ?? [];
                proposal.competitiveAdvantageAnalysis =
                    dto.competitiveAdvantageAnalysis ?? [];
                proposal.members = dto.members ?? [];
                proposal.intellectualPropertyStatus = dto.intellectualPropertyStatus;
                proposal.scope = dto.proposalScope;
                proposal.methodology = dto.methodology;
                proposal.curriculumVitae = dto.curriculumVitae ?? null;
                proposal.aiAnalysisSummary = aiAnalysisSummary;
                await this.em.flush();
                return proposal;
            }
            const proposal = this.em.create(capsule_proposal_entity_1.CapsuleProposal, {
                title: dto.title,
                description: dto.description,
                problemStatement: dto.problemStatement,
                targetMarket: dto.targetMarket,
                solutionDescription: dto.solutionDescription,
                objectives: dto.objectives ?? [],
                historicalTimeline: dto.historicalTimeline ?? [],
                competitiveAdvantageAnalysis: dto.competitiveAdvantageAnalysis ?? [],
                members: dto.members ?? [],
                intellectualPropertyStatus: dto.intellectualPropertyStatus,
                scope: dto.proposalScope,
                methodology: dto.methodology,
                curriculumVitae: dto.curriculumVitae ?? null,
                aiAnalysisSummary,
                startup,
            });
            await this.em.persistAndFlush(proposal);
            return proposal;
        }
        catch (err) {
            console.error(`Error creating capsule proposal`, err);
            throw err;
        }
    }
    async update(id, dto) {
        const startup = await this.getStartupById(id);
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        if (dto.userId !== undefined) {
            const user = await this.em.findOne(user_entity_1.User, { id: dto.userId });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${dto.userId} not found`);
            }
            startup.user = user;
        }
        if (dto.name !== undefined)
            startup.name = dto.name;
        if (dto.qualificationStatus !== undefined)
            startup.qualificationStatus = dto.qualificationStatus;
        if (dto.dataPrivacy !== undefined)
            startup.dataPrivacy = dto.dataPrivacy;
        if (dto.links !== undefined)
            startup.links = dto.links;
        if (dto.groupName !== undefined)
            startup.groupName = dto.groupName;
        if (dto.universityName !== undefined)
            startup.universityName = dto.universityName;
        if (dto.eligibility !== undefined)
            startup.eligibility = dto.eligibility;
        await this.em.flush();
        return startup;
    }
    async updateWithCapsuleProposal(id, dto, capsuleProposalDto) {
    }
    async remove(id) {
        const startup = await this.getStartupById(id);
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        await this.em.removeAndFlush(startup);
    }
    async createStartup(dto) {
    }
    async removeMemberFromStartup(userId, startupId) {
        const startup = await this.em.findOne(startup_entity_1.Startup, { id: startupId }, { populate: ['members'] });
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} not found.`);
        }
        const user = await this.em.findOne(user_entity_1.User, { id: userId });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found.`);
        }
        startup.members.remove(user);
        await this.em.flush();
    }
    async addMemberToStartup(dto) {
    }
    async getPendingStartupsRankingByUrat() {
        const allAnswers = await this.em.find(urat_question_answer_entity_1.UratQuestionAnswer, {}, {
            populate: ['startup'],
        });
        if (!allAnswers || allAnswers.length === 0) {
            console.warn('No UratQuestionAnswers found.');
            return [];
        }
        const startupScoreMap = new Map();
        for (const answer of allAnswers) {
            const startupId = answer.startup.id;
            const currentScore = startupScoreMap.get(startupId) || 0;
            startupScoreMap.set(startupId, currentScore + answer.score);
        }
        if (startupScoreMap.size === 0) {
            console.warn('No scores were calculated for startups.');
            return [];
        }
        const finalScores = [];
        for (const [startupId, uratScore] of startupScoreMap.entries()) {
            const technologyLevel = await this.calculateTechnologyLevel(startupId);
            finalScores.push({
                startup_id: startupId,
                score: uratScore + technologyLevel,
            });
        }
        if (finalScores.length === 0) {
            console.warn('No final scores were calculated.');
            return [];
        }
        finalScores.sort((a, b) => b.score - a.score);
        const startupIds = finalScores.map((ranking) => ranking.startup_id);
        const startups = await this.em.find(startup_entity_1.Startup, { id: { $in: startupIds } }, { populate: ['user'] });
        if (!startups || startups.length === 0) {
            console.warn('No startups found for the calculated IDs.');
            return [];
        }
        const startupsMap = new Map();
        for (const startup of startups) {
            startupsMap.set(startup.id, startup);
        }
        const orderedStartups = finalScores
            .map((ranking) => {
            const startup = startupsMap.get(ranking.startup_id);
            if (startup) {
                return {
                    ...startup,
                    ranking_score: ranking.score,
                };
            }
            return null;
        })
            .filter((startup) => Boolean(startup));
        if (orderedStartups.length === 0) {
            console.warn('No startups matched the final scores.');
            return [];
        }
        return orderedStartups;
    }
    async getQualifiedStartupsRankingByRubrics() {
    }
    async getStartupsByQualificationStatus(qualificationStatus) {
        const startups = await this.em.find(startup_entity_1.Startup, { qualificationStatus }, {
            populate: ['user', 'mentors', 'capsuleProposal'],
        });
        return startups.map((startup) => ({
            ...startup,
            mentors: startup.mentors.getItems().map((mentor) => mentor),
            capsuleProposal: startup.capsuleProposal ? startup.capsuleProposal : null,
        }));
    }
    async getCalculatorFinalScores(startupId) {
    }
    async approveApplicant(startupId) {
        const startup = await this.em.findOne(startup_entity_1.Startup, { id: startupId });
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} does not exist.`);
        }
        startup.qualificationStatus = qualification_status_enum_1.QualificationStatus.QUALIFIED;
        await this.em.flush();
        return { message: `Startup with ID ${startupId} has been approved.` };
    }
    async waitlistApplicant(startupId, dto) {
        const startup = await this.em.findOne(startup_entity_1.Startup, { id: startupId });
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} does not exist.`);
        }
        startup.qualificationStatus = qualification_status_enum_1.QualificationStatus.WAITLISTED;
        const manager = await this.em.findOne(user_entity_1.User, { id: dto.managerId });
        if (!manager) {
            throw new common_1.NotFoundException(`Manager with ID ${dto.managerId} does not exist.`);
        }
        const waitlistMessage = new startup_waitlist_message_entity_1.StartupWaitlistMessage();
        waitlistMessage.startup = startup;
        waitlistMessage.message = dto.message;
        waitlistMessage.manager = manager;
        this.em.persist(waitlistMessage);
        await this.em.flush();
        return {
            message: `Startup with ID ${startupId} has been waitlisted.`,
            waitlistMessage,
        };
    }
    async appointMentors(startupId, dto) {
        const startup = await this.em.findOne(startup_entity_1.Startup, { id: startupId });
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} does not exist.`);
        }
        const mentors = await this.em.find(user_entity_1.User, {
            id: { $in: dto.mentorIds },
            role: role_enum_1.Role.Mentor,
        });
        if (mentors.length !== dto.mentorIds.length) {
            throw new common_1.BadRequestException('One or more mentor IDs are invalid.');
        }
        startup.mentors.set(mentors);
        await this.em.flush();
        return {
            message: `Mentors have been successfully assigned to Startup ID ${startupId}.`,
        };
    }
    async allowRNAs(startupId) {
        return ((await this.em.count(startup_readiness_level_entity_1.StartupReadinessLevel, { startup: startupId })) > 0);
    }
    async allowTasks(startupId) {
        const count = await this.em.count(rna_entity_1.StartupRNA, {
            startup: startupId,
        });
        return count > 0;
    }
    async allowInitiatives(startupId) {
        const count = await this.em.count(rna_entity_1.StartupRNA, {
            startup: startupId,
        });
        return count > 0;
    }
    async allowRoadblocks(startupId) {
        const count = await this.em.count(rna_entity_1.StartupRNA, {
            startup: startupId,
        });
        return count > 0;
    }
    async markComplete(startupId) {
        const startup = await this.em.findOne(startup_entity_1.Startup, { id: startupId });
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} not found`);
        }
        startup.qualificationStatus = qualification_status_enum_1.QualificationStatus.COMPLETED;
        await this.em.flush();
        return {
            message: `Startup with ID ${startupId} has been marked as completed.`,
        };
    }
    async changeMentor(startupId, dto) {
        const startup = await this.em.findOne(startup_entity_1.Startup, { id: startupId }, { populate: ['mentors'] });
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} not found`);
        }
        const newMentor = await this.em.findOne(user_entity_1.User, {
            id: dto.mentorId,
            role: role_enum_1.Role.Mentor,
        });
        if (!newMentor) {
            throw new common_1.NotFoundException(`Mentor with ID ${dto.mentorId} not found`);
        }
        startup.mentors.set([newMentor]);
        await this.em.flush();
        return {
            message: `Mentor has been successfully changed for Startup ID ${startupId}.`,
            startup,
        };
    }
    async calculateTechnologyLevel(startupId) {
        const { technologyLevel } = await this.calculateLevels(startupId);
        return technologyLevel;
    }
    async calculateLevels(startupId) {
        const calculatorAnswers = await this.em.find(calculator_question_answer_entity_1.CalculatorQuestionAnswer, {
            startup: startupId,
        }, {
            populate: ['question'],
        });
        let technologyLevel = 1;
        let commercializationLevel = 1;
        let technologyScore = 0;
        let productDevelopment = 0;
        let productDefinition = 0;
        let competitiveLandscape = 0;
        let team = 0;
        let goToMarket = 0;
        let supplyChain = 0;
        for (const answer of calculatorAnswers) {
            const question = answer.question;
            const category = question.category.toLowerCase();
            if (category === 'technology') {
                technologyScore += question.score;
            }
            else if (category === 'product development') {
                productDevelopment += question.score;
            }
            else if (category === 'product definition/design') {
                productDefinition += question.score;
            }
            else if (category === 'competitive landscape') {
                competitiveLandscape += question.score;
            }
            else if (category === 'team') {
                team += question.score;
            }
            else if (category === 'go-to-market') {
                goToMarket += question.score;
            }
            else if (category === 'manufacturing/supply chain') {
                supplyChain += question.score;
            }
        }
        if (technologyScore >= 4)
            technologyLevel = 4;
        if (technologyScore >= 5)
            technologyLevel = 5;
        if (productDevelopment >= 2 && productDefinition >= 3)
            technologyLevel = 6;
        if (productDevelopment >= 3)
            technologyLevel = 7;
        if (productDevelopment >= 4)
            technologyLevel = 8;
        if (productDevelopment >= 5)
            technologyLevel = 9;
        if (competitiveLandscape >= 1 && team >= 1)
            commercializationLevel = 1;
        if (competitiveLandscape >= 2 && team === 2)
            commercializationLevel = 2;
        if (productDevelopment >= 1 &&
            productDefinition >= 1 &&
            competitiveLandscape >= 3 &&
            team >= 2 &&
            goToMarket >= 1) {
            commercializationLevel = 3;
        }
        if (productDefinition >= 2 &&
            competitiveLandscape >= 4 &&
            team >= 2 &&
            goToMarket >= 2 &&
            supplyChain >= 1) {
            commercializationLevel = 4;
        }
        if (productDefinition >= 4 &&
            competitiveLandscape >= 5 &&
            team >= 3 &&
            goToMarket >= 3 &&
            supplyChain >= 2) {
            commercializationLevel = 5;
        }
        if (productDefinition >= 5 && team >= 4 && goToMarket >= 4) {
            commercializationLevel = 6;
        }
        if (team >= 4 && supplyChain >= 3)
            commercializationLevel = 7;
        if (team >= 5 && supplyChain >= 4)
            commercializationLevel = 8;
        if (team >= 5 && supplyChain >= 5)
            commercializationLevel = 9;
        return {
            technologyLevel,
            commercializationLevel,
            technologyScore,
            productDevelopment,
            productDefinition,
            competitiveLandscape,
            team,
            goToMarket,
            supplyChain,
        };
    }
    async getReadinessLevelCriterionAnswers(startupId) {
        return this.em.find(startup_criterion_answer_entity_1.StartupCriterionAnswer, {
            startup: startupId,
        }, {
            populate: ['criterion'],
            orderBy: {
                id: 'ASC',
            },
        });
    }
    async getStartupReadinessLevel(startupId) {
        return this.em.find(startup_readiness_level_entity_1.StartupReadinessLevel, {
            startup: startupId,
        }, {
            populate: ['readinessLevel'],
            orderBy: {
                id: 'ASC',
            },
        });
    }
    async createStartupReadinessLevels(startupId) {
        const startup = await this.em.findOne(startup_entity_1.Startup, { id: startupId });
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} does not exist`);
        }
        const uratQuestionAnswers = await this.em.find(urat_question_answer_entity_1.UratQuestionAnswer, {
            startup: startupId,
        }, {
            populate: ['uratQuestion'],
        });
        const scoresByReadinessType = {
            [readiness_type_enum_1.ReadinessType.T]: 0,
            [readiness_type_enum_1.ReadinessType.M]: 0,
            [readiness_type_enum_1.ReadinessType.R]: 0,
            [readiness_type_enum_1.ReadinessType.A]: 0,
            [readiness_type_enum_1.ReadinessType.O]: 0,
            [readiness_type_enum_1.ReadinessType.I]: 0,
        };
        for (const answer of uratQuestionAnswers) {
            const readinessType = answer.uratQuestion.readinessType;
            scoresByReadinessType[readinessType] += answer.score;
        }
        for (const readinessType in scoresByReadinessType) {
            const normalizedScore = Math.ceil(scoresByReadinessType[readinessType] / 3);
            const scaledScore = Math.ceil(((normalizedScore - 1) * (9 - 1)) / (5 - 1) + 1);
            scoresByReadinessType[readinessType] = scaledScore;
        }
        const readinessLevels = await this.em.find(readiness_level_entity_1.ReadinessLevel, {});
        const readinessLevelsByType = readinessLevels.reduce((map, level) => {
            if (!map[level.readinessType]) {
                map[level.readinessType] = [];
            }
            map[level.readinessType].push(level);
            return map;
        }, {});
        const startupReadinessLevels = [];
        for (const readinessType of Object.values(readiness_type_enum_1.ReadinessType)) {
            const score = scoresByReadinessType[readinessType] || 1;
            const levels = readinessLevelsByType[readinessType];
            if (!levels || levels.length === 0) {
                throw new common_1.BadRequestException(`No readiness levels found for type: ${readinessType}`);
            }
            const selectedLevel = levels.find((level) => level.level === score) || levels[5];
            const startupReadinessLevel = new startup_readiness_level_entity_1.StartupReadinessLevel();
            startupReadinessLevel.startup = startup;
            startupReadinessLevel.readinessLevel = selectedLevel;
            this.em.persist(startupReadinessLevel);
            startupReadinessLevels.push(startupReadinessLevel);
        }
        await this.em.flush();
        return startupReadinessLevels;
    }
    async adminCreate(dto) {
        const user = await this.em.findOne(user_entity_1.User, { id: dto.userId });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${dto.userId} not found`);
        }
        const startup = this.em.create(startup_entity_1.Startup, {
            name: dto.name,
            user,
            qualificationStatus: dto.qualificationStatus,
            dataPrivacy: dto.dataPrivacy ?? false,
            links: dto.links,
            groupName: dto.groupName,
            universityName: dto.universityName,
            eligibility: dto.eligibility ?? false,
        });
        try {
            await this.em.persistAndFlush(startup);
        }
        catch (e) {
            const msg = String(e?.message ?? '');
            if (e?.code === '23505' && msg.includes('startups_pkey')) {
                await this.em
                    .getConnection()
                    .execute("select setval(pg_get_serial_sequence('startups','id'), coalesce((select max(id) from startups), 0), true)");
                await this.em.persistAndFlush(startup);
            }
            else {
                throw e;
            }
        }
        return startup;
    }
    async updateCapsuleProposal(startupId, dto) {
        const startup = await this.em.findOne(startup_entity_1.Startup, { id: startupId }, { populate: ['capsuleProposal'] });
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} not found`);
        }
        if (!startup.capsuleProposal) {
            throw new common_1.BadRequestException(`Startup with ID ${startupId} has no capsule proposal to update`);
        }
        const proposal = startup.capsuleProposal;
        proposal.title = dto.title;
        proposal.description = dto.description;
        proposal.problemStatement = dto.problemStatement;
        proposal.targetMarket = dto.targetMarket;
        proposal.solutionDescription = dto.solutionDescription;
        proposal.objectives = dto.objectives ?? [];
        proposal.historicalTimeline = dto.historicalTimeline ?? [];
        proposal.competitiveAdvantageAnalysis =
            dto.competitiveAdvantageAnalysis ?? [];
        proposal.intellectualPropertyStatus = dto.intellectualPropertyStatus;
        proposal.scope = dto.proposalScope;
        proposal.methodology = dto.methodology;
        proposal.curriculumVitae = dto.curriculumVitae ?? proposal.curriculumVitae;
        proposal.members = dto.members ?? [];
        startup.name = dto.title;
        startup.qualificationStatus = qualification_status_enum_1.QualificationStatus.PENDING;
        await this.em.flush();
        return startup;
    }
};
exports.StartupService = StartupService;
exports.StartupService = StartupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        ai_service_1.AiService])
], StartupService);
//# sourceMappingURL=startup.service.js.map