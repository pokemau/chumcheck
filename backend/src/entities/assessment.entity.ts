import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection, Enum } from "@mikro-orm/core";
import { AssessmentAnswerType } from "./enums/assessment-util.enum";
import { StartupResponse } from "./startup-response.entity";
import { AssessmentType } from "./assessment-type.entity";

@Entity({ tableName: "assessments" })
export class Assessment {
  @PrimaryKey({ autoincrement: true })
  assessment_id!: number;

  @ManyToOne(() => AssessmentType, { deleteRule: 'cascade' })
  assessmentType!: AssessmentType;

  @Property()
  description!: string; // e.g. "Dean's Response"

  @Enum(() => AssessmentAnswerType)
  answerType!: AssessmentAnswerType; // "File" | "LongAnswer" | etc.

  @OneToMany(() => StartupResponse, r => r.assessment)
  responses = new Collection<StartupResponse>(this);
}
