import { ReadinessLevel } from './readiness-level.entity';
export declare class LevelCriterion {
    id: number;
    criteria: string;
    excellent_description: string;
    good_description: string;
    fair_description: string;
    poor_description: string;
    very_poor_description: string;
    readinessLevel: ReadinessLevel;
}
