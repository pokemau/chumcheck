import { Startup } from './startup.entity';
import { ReadinessLevel } from './readiness-level.entity';
export declare class ElevateLogs {
    id: number;
    createdAt: Date;
    level: number;
    startup: Startup;
    readinessLevel: ReadinessLevel;
}
