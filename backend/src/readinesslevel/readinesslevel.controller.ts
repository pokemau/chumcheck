import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CalculatorQuestionAnswerDto,
  UratQuestionAnswerDto,
  UratQuestionDto,
} from './dto';
import { ReadinesslevelService } from './readinesslevel.service';
import { JwtGuard } from 'src/auth/guard';
import { UratQuestionAnswer } from 'src/entities/urat-question-answer.entity';

@Controller('readinesslevel')
export class ReadinesslevelController {
  constructor(private readinessLevelService: ReadinesslevelService) {}

  @Get('/urat-questions')
  async getUratQuestions() {
    return await this.readinessLevelService.getUratQuestions();
  }

  @Get('/calculator-questions')
  async getCalculatorQuestions() {
    return await this.readinessLevelService.getCalculatorQuestions();
  }

  @Get('/readiness-levels')
  async getReadinessLevels() {
    return await this.readinessLevelService.getReadinessLevels();
  }

  @Get('/criterion')
  async getReadinessLevelCriterion() {
    return await this.readinessLevelService.getReadinessLevelCriterion();
  }

  @UseGuards(JwtGuard)
  @Post('/urat-question-answers/create')
  async createUratQuestionAnswers(@Body() dto: UratQuestionAnswerDto) {
    return await this.readinessLevelService.createUratQuestionAnswers(dto);
  }

  @UseGuards(JwtGuard)
  @Post('/calculator-question-answers/create')
  async createCalculatorQuestionAnswers(
    @Body() dto: CalculatorQuestionAnswerDto,
  ) {
    return await this.readinessLevelService.createCalculatorQuestionAnswers(
      dto,
    );
  }

  @UseGuards(JwtGuard)
  @Get('urat-question-answers')
  async getUratQuestionAnswers(@Query('startupId') startupId: number) {
    return await this.readinessLevelService.getUratQuestionAnswers(startupId);
  }
}
