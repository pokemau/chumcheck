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
exports.CalculatorQuestionAnswer = void 0;
const core_1 = require("@mikro-orm/core");
const calculator_question_entity_1 = require("./calculator-question.entity");
const startup_entity_1 = require("./startup.entity");
let CalculatorQuestionAnswer = class CalculatorQuestionAnswer {
    id;
    question;
    startup;
};
exports.CalculatorQuestionAnswer = CalculatorQuestionAnswer;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], CalculatorQuestionAnswer.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => calculator_question_entity_1.CalculatorQuestion),
    __metadata("design:type", calculator_question_entity_1.CalculatorQuestion)
], CalculatorQuestionAnswer.prototype, "question", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => startup_entity_1.Startup),
    __metadata("design:type", startup_entity_1.Startup)
], CalculatorQuestionAnswer.prototype, "startup", void 0);
exports.CalculatorQuestionAnswer = CalculatorQuestionAnswer = __decorate([
    (0, core_1.Entity)({ tableName: 'calculator_question_answers' })
], CalculatorQuestionAnswer);
//# sourceMappingURL=calculator-question-answer.entity.js.map