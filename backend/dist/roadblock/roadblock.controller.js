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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadblockController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const roadblock_service_1 = require("./roadblock.service");
const roadblock_dto_1 = require("./dto/roadblock.dto");
let RoadblockController = class RoadblockController {
    roadblockService;
    constructor(roadblockService) {
        this.roadblockService = roadblockService;
    }
    async getByStartupId(startupId) {
        return await this.roadblockService.getByStartupId(startupId);
    }
    async createRoadblock(dto) {
        return await this.roadblockService.createRoadblock(dto);
    }
    async update(id, dto) {
        return this.roadblockService.update(id, dto);
    }
    async delete(id) {
        return await this.roadblockService.deleteRoadblock(id);
    }
    async generateRoadblocks(dto) {
        return this.roadblockService.generateRoadblocks(dto);
    }
    async refineRoadblock(id, dto) {
        return await this.roadblockService.refineRoadblock(id, dto.chatHistory, dto.latestPrompt);
    }
};
exports.RoadblockController = RoadblockController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('startupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoadblockController.prototype, "getByStartupId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [roadblock_dto_1.CreateRoadblockDto]),
    __metadata("design:returntype", Promise)
], RoadblockController.prototype, "createRoadblock", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, roadblock_dto_1.UpdateRoadblockDto]),
    __metadata("design:returntype", Promise)
], RoadblockController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoadblockController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('generate-roadblocks'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [roadblock_dto_1.GenerateRoadblocksDto]),
    __metadata("design:returntype", Promise)
], RoadblockController.prototype, "generateRoadblocks", null);
__decorate([
    (0, common_1.Post)(':id/refine'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RoadblockController.prototype, "refineRoadblock", null);
exports.RoadblockController = RoadblockController = __decorate([
    (0, common_1.Controller)('roadblocks'),
    __metadata("design:paramtypes", [roadblock_service_1.RoadblockService])
], RoadblockController);
//# sourceMappingURL=roadblock.controller.js.map