import { User } from './user.entity';
import { Startup } from './startup.entity';
import { RnsStatus } from './enums/rns.enum';
export declare class Roadblock {
    id: number;
    assignee: User;
    startup: Startup;
    isAiGenerated: boolean;
    status: RnsStatus;
    requestedStatus?: RnsStatus;
    approvalStatus: 'Pending' | 'Approved' | 'Denied' | 'Unchanged';
    riskNumber: number;
    description: string;
    fix: string;
    createdAt: Date;
    updatedAt: Date;
    clickedByMentor: boolean;
    clickedByStartup: boolean;
}
