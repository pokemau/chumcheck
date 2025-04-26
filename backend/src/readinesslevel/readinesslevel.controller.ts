import { Body, Controller, Get, Post } from '@nestjs/common';
import { UratQuestionDto } from './dto';
import { ReadinesslevelService } from './readinesslevel.service';

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

  @Post('/urat-question-answers')
  createUratQuestionAnswers(@Body() dto: UratQuestionDto) {
    console.log('BULK CREATE URAT QUESTION ANSWERS');
    console.log('BULK CREATE URAT QUESTION ANSWERS');
    console.log('BULK CREATE URAT QUESTION ANSWERS');
    console.log(dto);
  }

  @Post('/calculator-question-answers')
  createCalculatorQuestionAnswers() {}
}
