import { Entity, PrimaryKey, Property, ManyToOne, Enum } from "@mikro-orm/core";
import { AssessmentStatus, AssessmentType } from "./enums/assessment-util.enum";

@Entity({ tableName: "startup_assessments" })
export class StartupAssessment {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  startupId!: number; // FK → Startup table

  @Enum(() => AssessmentType)
  assessmentType!: AssessmentType;

  @Enum(() => AssessmentStatus)
  status!: AssessmentStatus; // "Pending" | "Completed"
}