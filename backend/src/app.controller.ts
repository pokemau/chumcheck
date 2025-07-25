import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @Post('/a')
  // generateUratQuestions() {
  //  this.appService.generateUratQuestions();
  // }
  //
  // @Post('/b')
  // generateCalculatorQuestions() {
  //  this.appService.generateCalculatorQuestions();
  // }
  //
  // @Post('/c')
  // generateReadinessTypes() {
  //  this.appService.generateReadinessTypes();
  // }
}
