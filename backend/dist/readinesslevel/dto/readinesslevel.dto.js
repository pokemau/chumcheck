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
exports.UratQuestionAnswerDto = exports.CalculatorQuestionAnswerDto = exports.UratQuestionDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UratQuestionDto {
    startupId;
    uratQuestionId;
    response;
    score;
}
exports.UratQuestionDto = UratQuestionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UratQuestionDto.prototype, "startupId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UratQuestionDto.prototype, "uratQuestionId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UratQuestionDto.prototype, "response", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UratQuestionDto.prototype, "score", void 0);
class CalculatorQuestionAnswer {
    startupId;
    calculatorQuestionId;
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CalculatorQuestionAnswer.prototype, "startupId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CalculatorQuestionAnswer.prototype, "calculatorQuestionId", void 0);
class CalculatorQuestionAnswerDto {
    calculatorAnswers;
}
exports.CalculatorQuestionAnswerDto = CalculatorQuestionAnswerDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CalculatorQuestionAnswer),
    __metadata("design:type", Array)
], CalculatorQuestionAnswerDto.prototype, "calculatorAnswers", void 0);
class UratQuestionnswer {
    startupId;
    uratQuestionId;
    response;
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UratQuestionnswer.prototype, "startupId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UratQuestionnswer.prototype, "uratQuestionId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], UratQuestionnswer.prototype, "response", void 0);
class UratQuestionAnswerDto {
    answers;
}
exports.UratQuestionAnswerDto = UratQuestionAnswerDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => UratQuestionnswer),
    __metadata("design:type", Array)
], UratQuestionAnswerDto.prototype, "answers", void 0);
//# sourceMappingURL=readinesslevel.dto.js.map