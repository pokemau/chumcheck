import { Assessment } from "./assessment.entity";
export declare class StartupResponse {
    id: number;
    startupId: number;
    assessment: Assessment;
    answerValue?: string;
    submittedAt?: Date;
}
