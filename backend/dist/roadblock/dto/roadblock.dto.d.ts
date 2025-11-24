import { RnsStatus } from 'src/entities/enums/rns.enum';
export declare class CreateRoadblockDto {
    assigneeId: number;
    startupId: number;
    isAiGenerated: boolean;
    status: RnsStatus;
    riskNumber: number;
    description: string;
    fix: string;
}
export declare class UpdateRoadblockDto {
    assigneeId?: number;
    startupId?: number;
    isAiGenerated?: boolean;
    status: RnsStatus;
    requestedStatus: RnsStatus;
    approvalStatus: 'Pending' | 'Approved' | 'Denied' | 'Unchanged';
    riskNumber?: number;
    description?: string;
    fix?: string;
    clickedByMentor?: boolean;
    clickedByStartup?: boolean;
}
export declare class GenerateRoadblocksDto {
    startupId: number;
    no_of_roadblocks_to_create: number;
    debug: boolean;
}
