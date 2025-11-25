import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Startup } from './startup.entity';
import { UratQuestion } from './urat-question.entity';

@Entity({ tableName: 'urat_question_answers' })
export class UratQuestionAnswer {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ type: 'text' })
  response!: string;

  @Property()
  score: number = 1;

  @ManyToOne(() => Startup, { deleteRule: 'cascade' })
  startup!: Startup;

  @ManyToOne(() => UratQuestion)
  uratQuestion!: UratQuestion;
}
