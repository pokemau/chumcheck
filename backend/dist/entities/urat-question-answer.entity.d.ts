import { Startup } from './startup.entity';
import { UratQuestion } from './urat-question.entity';
export declare class UratQuestionAnswer {
    id: number;
    response: string;
    score: number;
    startup: Startup;
    uratQuestion: UratQuestion;
}
