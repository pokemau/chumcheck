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
exports.ChangeMentorDto = exports.AppointMentorsDto = exports.WaitlistStartupDto = exports.StartupApplicationDto = exports.AddStartupMemberDto = exports.StartupApplicationDtoOld = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class StartupApplicationDtoOld {
    userId;
    name;
    dataPrivacy;
    eligibility;
    links;
    groupName;
    universityName;
}
exports.StartupApplicationDtoOld = StartupApplicationDtoOld;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], StartupApplicationDtoOld.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StartupApplicationDtoOld.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], StartupApplicationDtoOld.prototype, "dataPrivacy", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], StartupApplicationDtoOld.prototype, "eligibility", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StartupApplicationDtoOld.prototype, "links", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StartupApplicationDtoOld.prototype, "groupName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StartupApplicationDtoOld.prototype, "universityName", void 0);
class AddStartupMemberDto {
    userId;
    startupId;
}
exports.AddStartupMemberDto = AddStartupMemberDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AddStartupMemberDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AddStartupMemberDto.prototype, "startupId", void 0);
class HistoricalTimelineDto {
    monthYear;
    description;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HistoricalTimelineDto.prototype, "monthYear", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HistoricalTimelineDto.prototype, "description", void 0);
class CompetitiveAdvantageDto {
    competitorName;
    offer;
    pricingStrategy;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CompetitiveAdvantageDto.prototype, "competitorName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CompetitiveAdvantageDto.prototype, "offer", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CompetitiveAdvantageDto.prototype, "pricingStrategy", void 0);
class MemberDto {
    name;
    role;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MemberDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MemberDto.prototype, "role", void 0);
class StartupApplicationDto {
    title;
    description;
    problemStatement;
    targetMarket;
    solutionDescription;
    historicalTimeline;
    competitiveAdvantageAnalysis;
    intellectualPropertyStatus;
    objectives;
    proposalScope;
    methodology;
    members;
    curriculumVitae;
}
exports.StartupApplicationDto = StartupApplicationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StartupApplicationDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StartupApplicationDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StartupApplicationDto.prototype, "problemStatement", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StartupApplicationDto.prototype, "targetMarket", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StartupApplicationDto.prototype, "solutionDescription", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => HistoricalTimelineDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], StartupApplicationDto.prototype, "historicalTimeline", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CompetitiveAdvantageDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], StartupApplicationDto.prototype, "competitiveAdvantageAnalysis", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StartupApplicationDto.prototype, "intellectualPropertyStatus", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], StartupApplicationDto.prototype, "objectives", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StartupApplicationDto.prototype, "proposalScope", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StartupApplicationDto.prototype, "methodology", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MemberDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], StartupApplicationDto.prototype, "members", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StartupApplicationDto.prototype, "curriculumVitae", void 0);
class WaitlistStartupDto {
    message;
    managerId;
}
exports.WaitlistStartupDto = WaitlistStartupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WaitlistStartupDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], WaitlistStartupDto.prototype, "managerId", void 0);
class AppointMentorsDto {
    mentorIds;
}
exports.AppointMentorsDto = AppointMentorsDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], AppointMentorsDto.prototype, "mentorIds", void 0);
class ChangeMentorDto {
    mentorId;
}
exports.ChangeMentorDto = ChangeMentorDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChangeMentorDto.prototype, "mentorId", void 0);
//# sourceMappingURL=startup.dto.js.map