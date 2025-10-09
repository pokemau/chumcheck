import { Entity, PrimaryKey, Property, ManyToOne, Enum } from "@mikro-orm/core";
import { AssessmentStatus } from "./enums/assessment-util.enum";
import { AssessmentType } from "./assessment-type.entity";

@Entity({ tableName: "startup_assessments" })
export class StartupAssessment {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  startupId!: number; // FK → Startup table

  @ManyToOne(() => AssessmentType, { deleteRule: 'cascade' })
  assessmentType!: AssessmentType;

  @Enum(() => AssessmentStatus)
  status!: AssessmentStatus; // "Pending" | "Completed"
}