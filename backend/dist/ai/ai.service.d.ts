import { EntityManager } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { Startup } from 'src/entities/startup.entity';
import { StartupApplicationDto } from 'src/startup/dto/startup.dto';
export declare class AiService {
    private config;
    private readonly ai;
    constructor(config: ConfigService);
    test(): Promise<string | undefined>;
    getCapsuleProposalInfo(text: string): Promise<string | undefined>;
    generateStartupAnalysisSummary(dto: StartupApplicationDto): Promise<string>;
    generateRNAsFromPrompt(prompt: string): Promise<{
        readiness_level_type: string;
        rna: string;
    }[]>;
    generateTasksFromPrompt(prompt: string): Promise<{
        target_level: number;
        description: string;
    }[]>;
    generateInitiativesFromPrompt(prompt: string): Promise<{
        description: string;
        measures: string;
        targets: string;
        remarks: string;
    }[]>;
    refineRnsDescription(prompt: string): Promise<{
        refinedDescription: string;
        aiCommentary: string;
    }>;
    generateRoadblocksFromPrompt(prompt: string): Promise<{
        description: string;
        fix: string;
        riskNumber: number;
    }[]>;
    createBasePrompt(startup: Startup, em: EntityManager): Promise<string | null>;
    refineInitiative(prompt: string): Promise<{
        refinedDescription?: string;
        refinedMeasures?: string;
        refinedTargets?: string;
        refinedRemarks?: string;
        aiCommentary: string;
    }>;
    refineRoadblock(prompt: string): Promise<{
        refinedDescription?: string;
        refinedFix?: string;
        aiCommentary: string;
    }>;
    refineRna(prompt: string): Promise<{
        refinedRna?: string;
        aiCommentary: string;
    }>;
}
