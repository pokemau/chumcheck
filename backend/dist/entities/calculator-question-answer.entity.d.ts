import { CalculatorQuestion } from './calculator-question.entity';
import { Startup } from './startup.entity';
export declare class CalculatorQuestionAnswer {
    id: number;
    question: CalculatorQuestion;
    startup: Startup;
}
