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
exports.UratQuestionAnswer = void 0;
const core_1 = require("@mikro-orm/core");
const startup_entity_1 = require("./startup.entity");
const urat_question_entity_1 = require("./urat-question.entity");
let UratQuestionAnswer = class UratQuestionAnswer {
    id;
    response;
    score = 1;
    startup;
    uratQuestion;
};
exports.UratQuestionAnswer = UratQuestionAnswer;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], UratQuestionAnswer.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], UratQuestionAnswer.prototype, "response", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], UratQuestionAnswer.prototype, "score", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => startup_entity_1.Startup),
    __metadata("design:type", startup_entity_1.Startup)
], UratQuestionAnswer.prototype, "startup", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => urat_question_entity_1.UratQuestion),
    __metadata("design:type", urat_question_entity_1.UratQuestion)
], UratQuestionAnswer.prototype, "uratQuestion", void 0);
exports.UratQuestionAnswer = UratQuestionAnswer = __decorate([
    (0, core_1.Entity)({ tableName: 'urat_question_answers' })
], UratQuestionAnswer);
//# sourceMappingURL=urat-question-answer.entity.js.map