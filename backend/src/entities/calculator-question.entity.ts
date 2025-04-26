import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { CalculatorCategory } from './enums/calculator-category.enum';

@Entity({ tableName: 'calculator_questions' })
export class CalculatorQuestion {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  question!: string;

  @Property()
  score!: number;

  @Enum(() => CalculatorCategory)
  category!: CalculatorCategory;
}
