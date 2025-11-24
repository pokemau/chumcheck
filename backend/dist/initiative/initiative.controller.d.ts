import { InitiativeService } from './initiative.service';
import { CreateInitiativeDto, GenerateInitiativeDto, UpdateInitiativeDto } from './dto/initiative.dto';
export declare class InitiativeController {
    private initiativeService;
    constructor(initiativeService: InitiativeService);
    getStartupInitiative(startupId: number): Promise<import("../entities/initiative.entity").Initiative[]>;
    createInitiative(dto: CreateInitiativeDto): Promise<import("../entities/initiative.entity").Initiative>;
    update(id: number, dto: UpdateInitiativeDto): Promise<import("@mikro-orm/core").Loaded<import("../entities/initiative.entity").Initiative, never, "*", never>>;
    delete(id: number): Promise<{
        message: string;
    }>;
    generateInitiatives(dto: GenerateInitiativeDto): Promise<import("../entities/initiative.entity").Initiative[]>;
    refineInitiative(id: number, dto: {
        chatHistory: {
            role: 'User' | 'Ai';
            content: string;
        }[];
        latestPrompt: string;
    }): Promise<{
        refinedDescription?: string;
        refinedMeasures?: string;
        refinedTargets?: string;
        refinedRemarks?: string;
        aiCommentary: string;
    }>;
    roleStatusUpdate(id: number, role: string, dto: UpdateInitiativeDto): Promise<import("@mikro-orm/core").Loaded<import("../entities/initiative.entity").Initiative, never, "*", never>>;
}
