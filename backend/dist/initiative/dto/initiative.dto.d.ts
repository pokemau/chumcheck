import { RnsStatus } from '../../entities/enums/rns.enum';
export declare class CreateInitiativeDto {
    initiativeNumber: number;
    status: RnsStatus;
    rnsId: number;
    isAiGenerated: boolean;
    assigneeId: number;
    startupId: number;
    description: string;
    measures: string;
    targets: string;
    remarks: string;
}
export declare class UpdateInitiativeDto {
    initiativeNumber: number;
    status: RnsStatus;
    requestedStatus: RnsStatus;
    approvalStatus: 'Pending' | 'Approved' | 'Denied' | 'Unchanged';
    rnsId: number;
    isAiGenerated: boolean;
    assigneeId: number;
    startupId: number;
    description: string;
    measures: string;
    targets: string;
    remarks: string;
    clickedByMentor?: boolean;
    clickedByStartup?: boolean;
}
export declare class GenerateInitiativeDto {
    rnsId?: number;
    rnsIds?: number[];
    no_of_initiatives_to_create: number;
    debug: boolean;
}
