import { Entity, PrimaryKey, Property, OneToMany, Collection } from "@mikro-orm/core";
import { Assessment } from "./assessment.entity";
import { StartupAssessment } from "./startup-assessment.entity";

@Entity({ tableName: "assessment_types"})
export class AssessmentType{
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property({ fieldName: 'type' })
    type!: string;

    @OneToMany(() => Assessment, a => a.assessmentType)
    assessments = new Collection<Assessment>(this);

    @OneToMany(() => StartupAssessment, sa => sa.assessmentType)
    startupAssessments = new Collection<StartupAssessment>(this);
}
