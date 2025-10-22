import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Assessment } from "./assessment.entity";

@Entity({ tableName: "startup_responses" })
export class StartupResponse {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  startupId!: number; // FK → Startup table

  @ManyToOne(() => Assessment, { deleteRule: 'cascade' })
  assessment!: Assessment; // the specific question answered

  @Property({ nullable: true, type: 'text' })
  answerValue?: string; // text, file URL, or JSON array of files

  @Property()
  submittedAt?: Date = new Date();
}