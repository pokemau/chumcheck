export declare class UratQuestionDto {
    startupId: number;
    uratQuestionId: number;
    response: string;
    score: number;
}
declare class CalculatorQuestionAnswer {
    startupId: number;
    calculatorQuestionId: number;
}
export declare class CalculatorQuestionAnswerDto {
    calculatorAnswers: CalculatorQuestionAnswer[];
}
declare class UratQuestionnswer {
    startupId: number;
    uratQuestionId: number;
    response: string;
}
export declare class UratQuestionAnswerDto {
    answers: UratQuestionnswer[];
}
export {};
