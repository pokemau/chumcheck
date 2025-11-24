import { EntityManager } from '@mikro-orm/core';
import { StartupRNA } from 'src/entities/rna.entity';
import { Startup } from 'src/entities/startup.entity';
import { CreateStartupRnaDto, UpdateStartupRnaDto } from './dto/rna.dto';
import { ReadinessLevel } from 'src/entities/readiness-level.entity';
import { AiService } from 'src/ai/ai.service';
export declare class RnaService {
    private em;
    private readonly aiService;
    constructor(em: EntityManager, aiService: AiService);
    getRNAbyId(startupId: number): Promise<import("@mikro-orm/core").Loaded<StartupRNA, "readinessLevel", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    create(dto: CreateStartupRnaDto): Promise<StartupRNA>;
    update(id: number, dto: UpdateStartupRnaDto): Promise<import("@mikro-orm/core").Loaded<StartupRNA, never, "*", never>>;
    delete(id: number): Promise<import("@mikro-orm/core").Loaded<StartupRNA, never, "*", never>>;
    generateRNA(id: number): Promise<{
        id: number;
        rna: string;
        isAiGenerated: boolean;
        startup: Startup;
        readinessLevel: ReadinessLevel;
    }[]>;
    checkIfAllReadinessTypesHaveRNA(startupId: number): Promise<boolean>;
    refineRna(rnaId: number, chatHistory: {
        role: 'User' | 'Ai';
        content: string;
    }[], latestPrompt: string): Promise<{
        refinedRna?: string;
        aiCommentary: string;
    }>;
}
