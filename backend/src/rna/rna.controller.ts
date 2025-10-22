import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RnaService } from './rna.service';
import {
  CreateStartupRnaDto,
  GenerateRNAsDto,
  UpdateStartupRnaDto,
} from './dto/rna.dto';

@Controller('rna')
export class RnaController {
  constructor(private readonly rnaService: RnaService) {}

  @Post()
  async create(@Body() dto: CreateStartupRnaDto) {
    return this.rnaService.create(dto);
  }

  @Get()
  async getStartupRna(@Query('startupId', ParseIntPipe) startupId: number) {
    return await this.rnaService.getRNAbyId(startupId);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateStartupRnaDto) {
    return this.rnaService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.rnaService.delete(id);
  }

  @Get(':id/generate-rna')
  async generateTasks(@Param('id', ParseIntPipe) id: number) {
    return await this.rnaService.generateRNA(id);
  }

  @Get(':id/check-complete')
  async checkIfAllReadinessTypesHaveRNA(@Param('id', ParseIntPipe) id: number) {
    return await this.rnaService.checkIfAllReadinessTypesHaveRNA(id);
  }

  @Post(':id/refine')
  async refineRna(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { chatHistory: any[]; latestPrompt: string },
  ) {
    return await this.rnaService.refineRna(
      id,
      body.chatHistory,
      body.latestPrompt,
    );
  }
}
