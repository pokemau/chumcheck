import { Collection } from '@mikro-orm/core';
import { ReadinessType } from './enums/readiness-type.enum';
import { LevelCriterion } from './level-criterion.entity';
export declare class ReadinessLevel {
    id: number;
    level: number;
    name: string;
    readinessType: ReadinessType;
    criteria: Collection<LevelCriterion, object>;
}
