import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { JwtGuard } from 'src/auth/guard';
  import { UratQuestionAnswer } from 'src/entities/urat-question-answer.entity';
import { RnaService } from './rna.service';

@Controller('rna')
export class RnaController {
    constructor(private readonly rnaService: RnaService) {}

    @Get()
    async getRNAbyId(
        @Query('startupId', ParseIntPipe) startupId: number,
      ) {
        return this.rnaService.getRNAbyId(startupId);
      }
    
}
