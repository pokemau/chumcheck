import { Startup } from './startup.entity';
import { LevelCriterion } from './level-criterion.entity';
export declare class StartupCriterionAnswer {
    id: number;
    score: number;
    remark?: string;
    criterion: LevelCriterion;
    startup: Startup;
    createdAt: Date;
    updatedAt: Date;
}
