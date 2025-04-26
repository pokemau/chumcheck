import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CalculatorQuestion } from 'src/entities/calculator-question.entity';
import { CalculatorCategory } from 'src/entities/enums/calculator-category.enum';
import { UratQuestion } from 'src/entities/urat-question.entity';

@Injectable()
export class ReadinesslevelService {
  constructor(private em: EntityManager) {}

  async getUratQuestions() {
    return await this.em.findAll(UratQuestion);
  }
  async getCalculatorQuestions() {
    const calcQuestions = await this.em.findAll(CalculatorQuestion);
  }
}
