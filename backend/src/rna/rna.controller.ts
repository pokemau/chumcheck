import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
  } from '@nestjs/common';
import { RnaService } from './rna.service';
import { CreateStartupRnaDto, UpdateStartupRnaDto } from './dto/rna.dto';

@Controller('rna')
export class RnaController {
    constructor(private readonly rnaService: RnaService) {}

    @Post()
    async create(
      @Body() dto: CreateStartupRnaDto
    ) {
      return this.rnaService.create(dto);
    }
    
    @Get()
    async getRNAbyId(
        @Query('startupId', ParseIntPipe) startupId: number,
      ) {
        return this.rnaService.getRNAbyId(startupId);
      }

    @Patch(':id')
    async update(
      @Param('id') id: number,
      @Body() dto: UpdateStartupRnaDto
    ) {
      return this.rnaService.update(id, dto);
    }
}
