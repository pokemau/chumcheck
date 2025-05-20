import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { InitiativeService } from './initiative.service';
import { CreateInitiativeDto, UpdateInitiativeDto } from './dto/initiative.dto';

@Controller('initiatives')
export class InitiativeController {
    constructor(private initiativeService: InitiativeService) {}

    @Get()
    async getStartupInitiative(@Query('startupId', ParseIntPipe) startupId: number) {
    return await this.initiativeService.getStartupInitiative(startupId);
    }

    @Post()
    async createRns(@Body() dto: CreateInitiativeDto) {
    return await this.initiativeService.createInitiative(dto);
    }

    @Patch(':id')
    async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInitiativeDto
    ) {
    return this.initiativeService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
    return this.initiativeService.delete(id);
    }

}
