import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "assessment_types"})
export class AssessmentType{
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property({ fieldName: 'type' })
    type!: string;
}
