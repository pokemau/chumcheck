import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  Enum,
} from '@mikro-orm/core';
import { AssessmentAnswerType } from './enums/assessment-util.enum';
import { StartupResponse } from './startup-response.entity';
import { AssessmentType } from './enums/assessment-type.enum';

@Entity({ tableName: 'assessments' })
export class Assessment {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Enum(() => AssessmentType)
  assessmentType!: AssessmentType;

  @Property()
  description!: string;

  @Enum(() => AssessmentAnswerType)
  answerType!: AssessmentAnswerType;

  @OneToMany(() => StartupResponse, (r) => r.assessment)
  responses = new Collection<StartupResponse>(this);
}
