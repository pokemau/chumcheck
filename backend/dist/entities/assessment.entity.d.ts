import { Collection } from "@mikro-orm/core";
import { AssessmentAnswerType } from "./enums/assessment-util.enum";
import { StartupResponse } from "./startup-response.entity";
import { AssessmentType } from "./assessment-type.entity";
export declare class Assessment {
    assessment_id: number;
    assessmentType: AssessmentType;
    description: string;
    answerType: AssessmentAnswerType;
    responses: Collection<StartupResponse, object>;
}
