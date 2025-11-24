import { EntityManager } from '@mikro-orm/core';
import { ReadinessType } from 'src/entities/enums/readiness-type.enum';
import { Startup } from 'src/entities/startup.entity';
export declare class ProgressService {
    private em;
    constructor(em: EntityManager);
    getProgressReport(startupId: number): Promise<{
        startup: import("@mikro-orm/core").Loaded<Startup, never, "*", never>;
        readinessLevels: {
            id: number;
            readinessLevelId: number;
            readinessType: ReadinessType;
            level: number;
            name: string;
            remark: string | undefined;
            createdAt: Date;
            updatedAt: Date;
        }[];
        rna: {
            id: number;
            readinessLevelId: number;
            readinessType: ReadinessType;
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
            readinessType: ReadinessType;
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
    getInitiavesByns(rnsId: number): Promise<{
        id: number;
        initiativeNumber: number;
        status: import("../entities/enums/rns.enum").RnsStatus;
        isAiGenerated: boolean;
        description: string;
        measures: string;
        targets: string;
        remarks: string;
        startup: {
            id: number;
            name: string;
        };
        assignee: {
            id: number;
            firstName: string | undefined;
            lastName: string | undefined;
        } | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
