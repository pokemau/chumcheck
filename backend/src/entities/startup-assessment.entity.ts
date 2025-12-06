import { Entity, PrimaryKey, ManyToOne, Enum } from '@mikro-orm/core';
import { AssessmentStatus } from './enums/assessment-util.enum';
import { AssessmentType } from './enums/assessment-type.enum';
import { Startup } from './startup.entity';

@Entity({ tableName: 'startup_assessments' })
export class StartupAssessment {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => Startup, { deleteRule: 'cascade' })
  startup!: Startup;

  @Enum(() => AssessmentType)
  assessmentType!: AssessmentType;

  @Enum(() => AssessmentStatus)
  status!: AssessmentStatus;
}
