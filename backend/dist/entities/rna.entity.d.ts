import { ReadinessLevel } from './readiness-level.entity';
import { Startup } from './startup.entity';
export declare class StartupRNA {
    id: number;
    readinessLevel: ReadinessLevel;
    startup: Startup;
    isAiGenerated: boolean;
    rna: string;
    createdAt?: Date;
    updatedAt?: Date;
}
