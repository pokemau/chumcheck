export declare class SubmitAnswerDto {
    assessmentId: string;
    answerValue: string;
}
export declare class SubmitAssessmentDto {
    startupId: number;
    assessmentName: string;
    responses: SubmitAnswerDto[];
}
export interface AssessmentFieldDto {
    id: string;
    description: string;
    type: string;
    answer?: string;
    fileUrl?: string;
}
export interface AssessmentDto {
    name: string;
    assessmentStatus: string;
    assessmentFields: AssessmentFieldDto[];
}
