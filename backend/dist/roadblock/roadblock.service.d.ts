import { EntityManager } from '@mikro-orm/core';
import { Roadblock } from 'src/entities/roadblock.entity';
import { CreateRoadblockDto, GenerateRoadblocksDto, UpdateRoadblockDto } from './dto/roadblock.dto';
import { AiService } from 'src/ai/ai.service';
import { RoadblockChatHistory } from 'src/entities/roadblock-chat-history.entity';
export declare class RoadblockService {
    private readonly em;
    private readonly aiService;
    constructor(em: EntityManager, aiService: AiService);
    getByStartupId(startupId: number): Promise<Roadblock[]>;
    createRoadblock(dto: CreateRoadblockDto): Promise<Roadblock>;
    update(id: number, dto: UpdateRoadblockDto): Promise<Roadblock>;
    statusChange(id: number, role: string, dto: UpdateRoadblockDto): Promise<import("@mikro-orm/core").Loaded<Roadblock, never, "*", never>>;
    deleteRoadblock(id: number): Promise<{
        message: string;
    }>;
    generateRoadblocks(dto: GenerateRoadblocksDto): Promise<string | Roadblock[]>;
    refineRoadblock(roadblockId: number, chatHistory: {
        role: 'User' | 'Ai';
        content: string;
    }[], latestPrompt: string): Promise<{
        refinedDescription?: string;
        refinedFix?: string;
        aiCommentary: string;
    }>;
    getRoadblockChatHistory(roadblockId: number): Promise<import("@mikro-orm/core").Loaded<RoadblockChatHistory, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
}
