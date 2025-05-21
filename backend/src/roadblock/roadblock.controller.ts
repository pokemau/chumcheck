import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { RoadblockService } from './roadblock.service';
import { CreateRoadblockDto, UpdateRoadblockDto } from './dto/roadblock.dto';

@Controller('roadblocks')
export class RoadblockController {
    constructor(private roadblockService: RoadblockService) {}

    @Get()
    async getByStartupId(@Query('startupId', ParseIntPipe) startupId: number) {
        return await this.roadblockService.getByStartupId(startupId);
    }

    @Post()
    async createRoadblock(@Body() dto: CreateRoadblockDto) {
    return await this.roadblockService.createRoadblock(dto);
    }

    @Patch(':id')
    async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoadblockDto
    ) {
    return this.roadblockService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
    return this.roadblockService.delete(id);
    }
}
