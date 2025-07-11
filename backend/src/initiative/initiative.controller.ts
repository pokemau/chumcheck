import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { InitiativeService } from './initiative.service';
import { CreateInitiativeDto, GenerateInitiativeDto, UpdateInitiativeDto } from './dto/initiative.dto';

@Controller('initiatives')
export class InitiativeController {
    constructor(private initiativeService: InitiativeService) {}

    @Get()
    async getStartupInitiative(@Query('startupId', ParseIntPipe) startupId: number) {
        return await this.initiativeService.getStartupInitiative(startupId);
    }

    @Post()
    async createInitiative(@Body() dto: CreateInitiativeDto) {
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

    @Post('generate-initiatives')
    async generateInitiatives(@Body() dto: GenerateInitiativeDto) {
        return await this.initiativeService.generateInitiatives(dto);
    }

    @Post(':id/refine')
    async refineInitiative(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: { 
            chatHistory: { role: 'User' | 'Ai'; content: string }[]; 
            latestPrompt: string 
        }
    ) {
        return await this.initiativeService.refineInitiative(
            id, 
            dto.chatHistory, 
            dto.latestPrompt
        );
    }

    @Patch(':id/roleDependent')
    async roleStatusUpdate(
        @Param('id', ParseIntPipe) id: number,
        @Query('role') role: string,
        @Body() dto: UpdateInitiativeDto
    ) {
        return this.initiativeService.statusChange(id, role, dto);
    }
}
