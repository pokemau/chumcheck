import { Startup } from './startup.entity';
import { User } from './user.entity';
import { RnsStatus } from './enums/rns.enum';
import { ReadinessType } from './enums/readiness-type.enum';
import { ReadinessLevel } from './readiness-level.entity';
export declare class Rns {
    id: number;
    priorityNumber: number;
    clickedByMentor: boolean;
    clickedByStartup: boolean;
    description: string;
    targetLevel: ReadinessLevel;
    isAiGenerated: boolean;
    status: RnsStatus;
    requestedStatus?: RnsStatus;
    approvalStatus: 'Pending' | 'Approved' | 'Denied' | 'Unchanged';
    readinessType: ReadinessType;
    startup: Startup;
    assignee: User;
    getTargetLevelScore(): number;
}
