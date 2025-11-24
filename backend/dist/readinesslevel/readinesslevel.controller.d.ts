import { CalculatorQuestionAnswerDto, UratQuestionAnswerDto } from './dto';
import { ReadinesslevelService } from './readinesslevel.service';
import { UratQuestionAnswer } from 'src/entities/urat-question-answer.entity';
export declare class ReadinesslevelController {
    private readinessLevelService;
    constructor(readinessLevelService: ReadinesslevelService);
    getUratQuestions(): Promise<import("@mikro-orm/core").Loaded<import("../entities/urat-question.entity").UratQuestion, never, "*", never>[]>;
    getCalculatorQuestions(): Promise<{
        category: string;
        questions: any;
    }[]>;
    getReadinessLevels(): Promise<import("@mikro-orm/core").Loaded<import("../entities/readiness-level.entity").ReadinessLevel, never, "*", never>[]>;
    getReadinessLevelCriterion(): Promise<import("@mikro-orm/core").Loaded<import("../entities/level-criterion.entity").LevelCriterion, never, "*", never>[]>;
    createUratQuestionAnswers(dto: UratQuestionAnswerDto): Promise<{
        message: string;
    }>;
    createCalculatorQuestionAnswers(dto: CalculatorQuestionAnswerDto): Promise<{
        message: string;
    }>;
    getUratQuestionAnswers(startupId: number): Promise<{
        id: number;
        response: string;
        score: number;
        startupId: number;
        questionId: number;
        readinessType: import("../entities/enums/readiness-type.enum").ReadinessType;
    }[]>;
    getStartupReadinessLevels(startupId: number): Promise<import("@mikro-orm/core").Loaded<import("../entities/startup-readiness-level.entity").StartupReadinessLevel, "readinessLevel", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    updateUratQuestionAnswer(id: number, dto: {
        response?: string;
        score?: number;
    }): Promise<import("@mikro-orm/core").Loaded<UratQuestionAnswer, never, "*", never>>;
    updateCalculatorQuestionAnswer(id: number, dto: {
        calculatorQuestionId?: number;
    }): Promise<import("@mikro-orm/core").Loaded<import("../entities/calculator-question-answer.entity").CalculatorQuestionAnswer, never, "*", never>>;
}
