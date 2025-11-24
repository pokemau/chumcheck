import { ProgressService } from './progress.service';
export declare class ProgressController {
    private progressService;
    constructor(progressService: ProgressService);
    getProgressReport(startupId: number): Promise<{
        startup: import("@mikro-orm/core").Loaded<import("../entities/startup.entity").Startup, never, "*", never>;
        readinessLevels: {
            id: number;
            readinessLevelId: number;
            readinessType: import("../entities/enums/readiness-type.enum").ReadinessType;
            level: number;
            name: string;
            remark: string | undefined;
            createdAt: Date;
            updatedAt: Date;
        }[];
        rna: {
            id: number;
            readinessLevelId: number;
            readinessType: import("../entities/enums/readiness-type.enum").ReadinessType;
            readinessLevel: {
                id: number;
                level: number;
                name: string;
            };
            isAiGenerated: boolean;
            rna: string;
            createdAt: Date | undefined;
            updatedAt: Date | undefined;
        }[];
        rns: {
            id: number;
            description: string;
            status: import("../entities/enums/rns.enum").RnsStatus;
            readinessType: import("../entities/enums/readiness-type.enum").ReadinessType;
            targetLevelId: number;
            targetLevelScore: number;
            priorityNumber: number;
            isAiGenerated: boolean;
            assignee: {
                id: number;
                firstName: string | undefined;
                lastName: string | undefined;
            } | null;
            initiatives: {
                id: number;
                initiativeNumber: number;
                status: import("../entities/enums/rns.enum").RnsStatus;
                isAiGenerated: boolean;
                measures: string;
                targets: string;
                description: string;
                assignee: {
                    id: number;
                    firstName: string | undefined;
                    lastName: string | undefined;
                } | null;
            }[];
        }[];
        roadblocks: {
            id: number;
            description: string;
            fix: string;
            status: import("../entities/enums/rns.enum").RnsStatus;
            riskNumber: number;
            isAiGenerated: boolean;
            assignee: {
                id: number;
                firstName: string | undefined;
                lastName: string | undefined;
            } | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
