import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RnsService } from './rns.service';
import { CreateRnsDto, UpdateRnsDto, GenerateTasksDto } from './dto';

@Controller('rns')
export class RnsController {
  constructor(private rnsService: RnsService) {}

  @Get()
  async getStartupRns(@Query('startupId', ParseIntPipe) startupId: number) {
    return await this.rnsService.getStartupRns(startupId);
  }

  @Post()
  async createRns(@Body() dto: CreateRnsDto) {
    return await this.rnsService.createRns(dto);
  }

  @Post('generate-tasks')
  async generateTasks(@Body() dto: GenerateTasksDto) {
    return await this.rnsService.generateTasks(dto);
  }

  @Delete(':id')
  async deleteRns(@Param('id', ParseIntPipe) id: number) {
    return await this.rnsService.deleteRns(id);
  }

  @Patch(':id')
  async updateRns(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRnsDto,
  ) {
    return await this.rnsService.updateRns(id, dto);
  }

  @Post(':id/refine')
  async refineRnsDescription(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: { chatHistory: { role: 'User' | 'Ai'; content: string; refinedDescription: string | null; }[]; latestPrompt: string },
  ) {
    return await this.rnsService.refineRnsDescription(id, dto.chatHistory, dto.latestPrompt);
  }
}
