import { AssessmentStatus } from "./enums/assessment-util.enum";
import { AssessmentType } from "./assessment-type.entity";
export declare class StartupAssessment {
    id: number;
    startupId: number;
    assessmentType: AssessmentType;
    status: AssessmentStatus;
}
