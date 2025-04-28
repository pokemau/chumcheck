import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { CalculatorQuestion } from './calculator-question.entity';
import { Startup } from './startup.entity';

@Entity({ tableName: 'calculator_question_answers' })
export class CalculatorQuestionAnswer {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => CalculatorQuestion)
  question!: CalculatorQuestion;

  @ManyToOne(() => Startup)
  startup!: Startup;
}
