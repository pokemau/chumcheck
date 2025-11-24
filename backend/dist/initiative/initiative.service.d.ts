import { EntityManager } from '@mikro-orm/core';
import { Initiative } from 'src/entities/initiative.entity';
import { CreateInitiativeDto, GenerateInitiativeDto, UpdateInitiativeDto } from './dto/initiative.dto';
import { AiService } from 'src/ai/ai.service';
export declare class InitiativeService {
    private readonly em;
    private readonly aiService;
    constructor(em: EntityManager, aiService: AiService);
    getStartupInitiative(startupId: number): Promise<Initiative[]>;
    createInitiative(dto: CreateInitiativeDto): Promise<Initiative>;
    update(id: number, dto: UpdateInitiativeDto): Promise<import("@mikro-orm/core").Loaded<Initiative, never, "*", never>>;
    statusChange(id: number, role: string, dto: UpdateInitiativeDto): Promise<import("@mikro-orm/core").Loaded<Initiative, never, "*", never>>;
    delete(id: number): Promise<{
        message: string;
    }>;
    generateInitiatives(dto: GenerateInitiativeDto): Promise<Initiative[]>;
    refineInitiative(initiativeId: number, chatHistory: {
        role: 'User' | 'Ai';
        content: string;
    }[], latestPrompt: string): Promise<{
        refinedDescription?: string;
        refinedMeasures?: string;
        refinedTargets?: string;
        refinedRemarks?: string;
        aiCommentary: string;
    }>;
}
