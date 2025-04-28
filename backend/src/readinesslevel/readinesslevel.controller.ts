import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CalculatorQuestionAnswerDto, UratQuestionDto } from './dto';
import { ReadinesslevelService } from './readinesslevel.service';
import { JwtGuard } from 'src/auth/guard';

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

  @UseGuards(JwtGuard)
  @Post('/urat-question-answers/create')
  async createUratQuestionAnswers(@Body() dto: UratQuestionDto) {
    console.log('BULK CREATE URAT QUESTION ANSWERS');
    console.log('BULK CREATE URAT QUESTION ANSWERS');
    console.log('BULK CREATE URAT QUESTION ANSWERS');
    console.log(dto);
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
}
