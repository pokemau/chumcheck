import { EntityManager } from '@mikro-orm/core';
import { UratQuestion } from 'src/entities/urat-question.entity';
import { CalculatorQuestionAnswerDto, UratQuestionAnswerDto } from './dto';
import { CalculatorQuestionAnswer } from 'src/entities/calculator-question-answer.entity';
import { UratQuestionAnswer } from 'src/entities/urat-question-answer.entity';
import { ReadinessLevel } from 'src/entities/readiness-level.entity';
import { LevelCriterion } from 'src/entities/level-criterion.entity';
import { StartupCriterionAnswer } from 'src/entities/startup-criterion-answer.entity';
import { StartupReadinessLevel } from 'src/entities/startup-readiness-level.entity';
export declare class ReadinesslevelService {
    private em;
    constructor(em: EntityManager);
    getUratQuestions(): Promise<import("@mikro-orm/core").Loaded<UratQuestion, never, "*", never>[]>;
    getCalculatorQuestions(): Promise<{
        category: string;
        questions: any;
    }[]>;
    getReadinessLevels(): Promise<import("@mikro-orm/core").Loaded<ReadinessLevel, never, "*", never>[]>;
    getReadinessLevelCriterion(): Promise<import("@mikro-orm/core").Loaded<LevelCriterion, never, "*", never>[]>;
    getReadinessLevelCriterionAnswers(startupId: number): Promise<import("@mikro-orm/core").Loaded<StartupCriterionAnswer, "criterion", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    getStartupReadinessLevel(startupId: number): Promise<import("@mikro-orm/core").Loaded<StartupReadinessLevel, "readinessLevel", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
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
    updateUratQuestionAnswer(id: number, dto: {
        response?: string;
        score?: number;
    }): Promise<import("@mikro-orm/core").Loaded<UratQuestionAnswer, never, "*", never>>;
    updateCalculatorQuestionAnswer(id: number, dto: {
        calculatorQuestionId?: number;
    }): Promise<import("@mikro-orm/core").Loaded<CalculatorQuestionAnswer, never, "*", never>>;
}
