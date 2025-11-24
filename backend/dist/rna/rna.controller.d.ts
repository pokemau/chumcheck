import { RnaService } from './rna.service';
import { CreateStartupRnaDto, UpdateStartupRnaDto } from './dto/rna.dto';
export declare class RnaController {
    private readonly rnaService;
    constructor(rnaService: RnaService);
    create(dto: CreateStartupRnaDto): Promise<import("../entities/rna.entity").StartupRNA>;
    getStartupRna(startupId: number): Promise<import("@mikro-orm/core").Loaded<import("../entities/rna.entity").StartupRNA, "readinessLevel", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    update(id: number, dto: UpdateStartupRnaDto): Promise<import("@mikro-orm/core").Loaded<import("../entities/rna.entity").StartupRNA, never, "*", never>>;
    delete(id: number): Promise<import("@mikro-orm/core").Loaded<import("../entities/rna.entity").StartupRNA, never, "*", never>>;
    generateTasks(id: number): Promise<{
        id: number;
        rna: string;
        isAiGenerated: boolean;
        startup: import("../entities/startup.entity").Startup;
        readinessLevel: import("../entities/readiness-level.entity").ReadinessLevel;
    }[]>;
    checkIfAllReadinessTypesHaveRNA(id: number): Promise<boolean>;
    refineRna(id: number, body: {
        chatHistory: any[];
        latestPrompt: string;
    }): Promise<{
        refinedRna?: string;
        aiCommentary: string;
    }>;
}
