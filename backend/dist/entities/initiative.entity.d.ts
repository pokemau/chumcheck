import { User } from './user.entity';
import { Startup } from './startup.entity';
import { Rns } from './rns.entity';
import { RnsStatus } from './enums/rns.enum';
export declare class Initiative {
    id: number;
    priorityNumber: number;
    initiativeNumber: number;
    clickedByMentor: boolean;
    clickedByStartup: boolean;
    status: RnsStatus;
    requestedStatus?: RnsStatus;
    approvalStatus: 'Pending' | 'Approved' | 'Denied' | 'Unchanged';
    rns: Rns;
    isAiGenerated: boolean;
    assignee: User;
    startup: Startup;
    description: string;
    measures: string;
    targets: string;
    remarks: string;
    createdAt: Date;
    updatedAt: Date;
}
