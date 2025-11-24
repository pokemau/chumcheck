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
exports.ReadinesslevelService = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const calculator_question_entity_1 = require("../entities/calculator-question.entity");
const urat_question_entity_1 = require("../entities/urat-question.entity");
const calculator_question_answer_entity_1 = require("../entities/calculator-question-answer.entity");
const startup_entity_1 = require("../entities/startup.entity");
const urat_question_answer_entity_1 = require("../entities/urat-question-answer.entity");
const readiness_level_entity_1 = require("../entities/readiness-level.entity");
const level_criterion_entity_1 = require("../entities/level-criterion.entity");
const startup_criterion_answer_entity_1 = require("../entities/startup-criterion-answer.entity");
const startup_readiness_level_entity_1 = require("../entities/startup-readiness-level.entity");
let ReadinesslevelService = class ReadinesslevelService {
    em;
    constructor(em) {
        this.em = em;
    }
    async getUratQuestions() {
        return await this.em.findAll(urat_question_entity_1.UratQuestion);
    }
    async getCalculatorQuestions() {
        const calcQuestions = await this.em.findAll(calculator_question_entity_1.CalculatorQuestion);
        const categoryMap = {};
        calcQuestions.forEach((item) => {
            const { category, id, question, score } = item;
            if (!categoryMap[category]) {
                categoryMap[category] = [];
            }
            categoryMap[category].push({ id, question, score });
        });
        const res = Object.keys(categoryMap).map((category) => ({
            category,
            questions: categoryMap[category],
        }));
        const selectedValues = {};
        res.forEach((category) => {
            if (!selectedValues[category.category] && category.questions.length > 0) {
                selectedValues[category.category] = `${category.questions[0].id}`;
            }
        });
        return res;
    }
    async getReadinessLevels() {
        return await this.em.findAll(readiness_level_entity_1.ReadinessLevel);
    }
    async getReadinessLevelCriterion() {
        return await this.em.findAll(level_criterion_entity_1.LevelCriterion);
    }
    async getReadinessLevelCriterionAnswers(startupId) {
        return this.em.find(startup_criterion_answer_entity_1.StartupCriterionAnswer, {
            startup: startupId,
        }, {
            populate: ['criterion'],
        });
    }
    async getStartupReadinessLevel(startupId) {
        const res = await this.em.find(startup_readiness_level_entity_1.StartupReadinessLevel, {
            startup: startupId,
        }, {
            populate: ['readinessLevel'],
        });
        return res;
    }
    async createUratQuestionAnswers(dto) {
        const answers = await Promise.all(dto.answers.map(async (answer) => {
            const question = await this.em.findOneOrFail(urat_question_entity_1.UratQuestion, { id: answer.uratQuestionId }, {
                failHandler: () => new Error(`CalculatorQuestion with ID ${answer.uratQuestionId} not found`),
            });
            const startup = await this.em.findOneOrFail(startup_entity_1.Startup, { id: answer.startupId }, {
                failHandler: () => new Error(`Startup with ID ${answer.startupId} not found`),
            });
            const uratQuestionAnswer = new urat_question_answer_entity_1.UratQuestionAnswer();
            uratQuestionAnswer.uratQuestion = question;
            uratQuestionAnswer.startup = startup;
            uratQuestionAnswer.response = answer.response;
            return uratQuestionAnswer;
        }));
        await this.em.persistAndFlush(answers);
        return { message: 'URAT Question Answers created successfully!' };
    }
    async createCalculatorQuestionAnswers(dto) {
        const answers = await Promise.all(dto.calculatorAnswers.map(async (answer) => {
            const question = await this.em.findOneOrFail(calculator_question_entity_1.CalculatorQuestion, { id: answer.calculatorQuestionId }, {
                failHandler: () => new Error(`CalculatorQuestion with ID ${answer.calculatorQuestionId} not found`),
            });
            const startup = await this.em.findOneOrFail(startup_entity_1.Startup, { id: answer.startupId }, {
                failHandler: () => new Error(`Startup with ID ${answer.startupId} not found`),
            });
            const calcQuestionAnswer = new calculator_question_answer_entity_1.CalculatorQuestionAnswer();
            calcQuestionAnswer.question = question;
            calcQuestionAnswer.startup = startup;
            return calcQuestionAnswer;
        }));
        await this.em.persistAndFlush(answers);
        return { message: 'Calculator Question Answers created successfully!' };
    }
    async getUratQuestionAnswers(startupId) {
        const answers = await this.em.find(urat_question_answer_entity_1.UratQuestionAnswer, {
            startup: startupId,
        }, { populate: ['uratQuestion'] });
        return answers.map((answer) => ({
            id: answer.id,
            response: answer.response,
            score: answer.score,
            startupId: answer.startup.id,
            questionId: answer.uratQuestion.id,
            readinessType: answer.uratQuestion.readinessType,
        }));
    }
    async updateUratQuestionAnswer(id, dto) {
        const answer = await this.em.findOneOrFail(urat_question_answer_entity_1.UratQuestionAnswer, { id });
        if (dto.response !== undefined)
            answer.response = dto.response;
        answer.score = 1;
        await this.em.flush();
        return answer;
    }
    async updateCalculatorQuestionAnswer(id, dto) {
        const answer = await this.em.findOneOrFail(calculator_question_answer_entity_1.CalculatorQuestionAnswer, {
            id,
        });
        if (dto.calculatorQuestionId !== undefined) {
            const newQuestion = await this.em.findOneOrFail(calculator_question_entity_1.CalculatorQuestion, {
                id: dto.calculatorQuestionId,
            });
            answer.question = newQuestion;
        }
        await this.em.flush();
        return answer;
    }
};
exports.ReadinesslevelService = ReadinesslevelService;
exports.ReadinesslevelService = ReadinesslevelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], ReadinesslevelService);
//# sourceMappingURL=readinesslevel.service.js.map