import { RnsService } from './rns.service';
import { CreateRnsDto, UpdateRnsDto, GenerateTasksDto } from './dto';
export declare class RnsController {
    private rnsService;
    constructor(rnsService: RnsService);
    getStartupRns(startupId: number): Promise<{
        id: number;
        priorityNumber: number;
        description: string;
        targetLevelId: number;
        isAiGenerated: boolean;
        status: import("../entities/enums/rns.enum").RnsStatus;
        requestedStatus: import("../entities/enums/rns.enum").RnsStatus | undefined;
        approvalStatus: "Unchanged" | "Pending" | "Approved" | "Denied";
        readinessType: import("../entities/enums/readiness-type.enum").ReadinessType;
        startup: number;
        assignee: import("../entities/user.entity").User;
        targetLevelScore: number;
        clickedByMentor: boolean;
        clickedByStartup: boolean;
    }[]>;
    createRns(dto: CreateRnsDto): Promise<import("../entities/rns.entity").Rns>;
    generateTasks(dto: GenerateTasksDto): Promise<{
        id: number;
        priorityNumber: number;
        description: string;
        targetLevelId: number;
        isAiGenerated: boolean;
        status: import("../entities/enums/rns.enum").RnsStatus;
        readinessType: import("../entities/enums/readiness-type.enum").ReadinessType;
        startup: number;
    }[] | {
        prompt: string;
    }>;
    deleteRns(id: number): Promise<{
        message: string;
    }>;
    updateRns(id: number, dto: UpdateRnsDto): Promise<import("@mikro-orm/core").Loaded<import("../entities/rns.entity").Rns, never, "*", never>>;
    refineRnsDescription(id: number, dto: {
        chatHistory: {
            role: 'User' | 'Ai';
            content: string;
            refinedDescription: string | null;
        }[];
        latestPrompt: string;
    }): Promise<{
        refinedDescription: string;
        aiCommentary: string;
    }>;
    roleStatusUpdate(id: number, role: string, dto: UpdateRnsDto): Promise<import("@mikro-orm/core").Loaded<import("../entities/rns.entity").Rns, never, "*", never>>;
}
