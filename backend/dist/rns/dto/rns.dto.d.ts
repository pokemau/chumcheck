import { ReadinessType } from 'src/entities/enums/readiness-type.enum';
import { RnsStatus } from 'src/entities/enums/rns.enum';
export declare class CreateRnsDto {
    assigneeId: number;
    description: string;
    isAiGenerated: boolean;
    priorityNumber: number;
    status: RnsStatus;
    readinessType: ReadinessType;
    startupId: number;
    targetLevelId: number;
}
export declare class UpdateRnsDto {
    readinessType?: ReadinessType;
    description?: string;
    targetLevel?: number;
    assigneeId?: number;
    priorityNumber?: number;
    status: RnsStatus;
    requestedStatus: RnsStatus;
    approvalStatus: 'Pending' | 'Approved' | 'Denied' | 'Unchanged';
    isAiGenerated?: boolean;
    clickedByMentor?: boolean;
    clickedByStartup?: boolean;
}
export declare class GenerateTasksDto {
    startup_id: number;
    rnaIds?: number[];
    startPriorityNumber?: number;
    term?: number;
    no_of_tasks_to_create: number;
    debug: boolean;
}
