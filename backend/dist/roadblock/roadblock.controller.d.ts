import { RoadblockService } from './roadblock.service';
import { CreateRoadblockDto, GenerateRoadblocksDto, UpdateRoadblockDto } from './dto/roadblock.dto';
export declare class RoadblockController {
    private roadblockService;
    constructor(roadblockService: RoadblockService);
    getByStartupId(startupId: number): Promise<import("../entities/roadblock.entity").Roadblock[]>;
    createRoadblock(dto: CreateRoadblockDto): Promise<import("../entities/roadblock.entity").Roadblock>;
    update(id: number, dto: UpdateRoadblockDto): Promise<import("../entities/roadblock.entity").Roadblock>;
    delete(id: number): Promise<{
        message: string;
    }>;
    generateRoadblocks(dto: GenerateRoadblocksDto): Promise<string | import("../entities/roadblock.entity").Roadblock[]>;
    refineRoadblock(id: number, dto: {
        chatHistory: {
            role: 'User' | 'Ai';
            content: string;
        }[];
        latestPrompt: string;
    }): Promise<{
        refinedDescription?: string;
        refinedFix?: string;
        aiCommentary: string;
    }>;
}
