import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection, Enum } from "@mikro-orm/core";
import { AssessmentType } from "./enums/assessment-util.enum";
import { AssessmentAnswerType } from "./enums/assessment-util.enum";
import { StartupResponse } from "./startup-response.entity";

@Entity({ tableName: "assessments" })
export class Assessment {
  @PrimaryKey({ autoincrement: true })
  assessment_id!: number;

  @Enum(() => AssessmentType)
  assessmentType!: AssessmentType;

  @Property()
  fieldKey!:string; // e.g. deans-response // basically mura siyag key

  @Property()
  description!: string; // e.g. "Dean's Response"

  @Enum(() => AssessmentAnswerType)
  answerType!: AssessmentAnswerType; // "File" | "LongAnswer" | etc.

  @OneToMany(() => StartupResponse, r => r.assessment)
  responses = new Collection<StartupResponse>(this);
}