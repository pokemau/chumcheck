import { Collection } from "@mikro-orm/core";
import { Assessment } from "./assessment.entity";
import { StartupAssessment } from "./startup-assessment.entity";
export declare class AssessmentType {
    id: number;
    type: string;
    assessments: Collection<Assessment, object>;
    startupAssessments: Collection<StartupAssessment, object>;
}
