import { Startup } from './startup.entity';
import { ReadinessLevel } from './readiness-level.entity';
export declare class StartupReadinessLevel {
    id: number;
    readinessLevel: ReadinessLevel;
    startup: Startup;
    remark?: string;
    createdAt: Date;
    updatedAt: Date;
}
