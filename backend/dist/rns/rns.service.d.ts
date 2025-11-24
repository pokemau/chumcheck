import { EntityManager } from '@mikro-orm/core';
import { Rns } from 'src/entities/rns.entity';
import { User } from 'src/entities/user.entity';
import { CreateRnsDto, UpdateRnsDto, GenerateTasksDto } from './dto';
import { ReadinessType } from 'src/entities/enums/readiness-type.enum';
import { AiService } from 'src/ai/ai.service';
import { RnsChatHistory } from 'src/entities/rns-chat-history.entity';
import { RnsStatus } from 'src/entities/enums/rns.enum';
export declare class RnsService {
    private em;
    private readonly aiService;
    constructor(em: EntityManager, aiService: AiService);
    getStartupRns(startupId: number): Promise<{
        id: number;
        priorityNumber: number;
        description: string;
        targetLevelId: number;
        isAiGenerated: boolean;
        status: RnsStatus;
        requestedStatus: RnsStatus | undefined;
        approvalStatus: "Unchanged" | "Pending" | "Approved" | "Denied";
        readinessType: ReadinessType;
        startup: number;
        assignee: User;
        targetLevelScore: number;
        clickedByMentor: boolean;
        clickedByStartup: boolean;
    }[]>;
    createRns(dto: CreateRnsDto): Promise<Rns>;
    deleteRns(rnsId: number): Promise<{
        message: string;
    }>;
    updateRns(rnsId: number, dto: UpdateRnsDto): Promise<import("@mikro-orm/core").Loaded<Rns, never, "*", never>>;
    statusChange(id: number, role: string, dto: UpdateRnsDto): Promise<import("@mikro-orm/core").Loaded<Rns, never, "*", never>>;
    generateTasks(dto: GenerateTasksDto): Promise<{
        id: number;
        priorityNumber: number;
        description: string;
        targetLevelId: number;
        isAiGenerated: boolean;
        status: RnsStatus;
        readinessType: ReadinessType;
        startup: number;
    }[] | {
        prompt: string;
    }>;
    refineRnsDescription(rnsId: number, chatHistory: {
        role: 'User' | 'Ai';
        content: string;
        refinedDescription: string | null;
    }[], latestPrompt: string): Promise<{
        refinedDescription: string;
        aiCommentary: string;
    }>;
    getRnsChatHistory(rnsId: number): Promise<import("@mikro-orm/core").Loaded<RnsChatHistory, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
}
