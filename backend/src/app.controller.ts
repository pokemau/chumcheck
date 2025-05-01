import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@Post('/a')
  //generateUratQuestions() {
  //  this.appService.generateUratQuestions();
  //}
  //
  //@Post('/b')
  //generateCalculatorQuestions() {
  //  this.appService.generateCalculatorQuestions();
  //}
}
