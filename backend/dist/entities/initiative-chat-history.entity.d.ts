import { Initiative } from './initiative.entity';
export declare class InitiativeChatHistory {
    id: number;
    initiative: Initiative;
    role: string;
    content: string;
    createdAt: Date;
    refinedDescription?: string;
    refinedMeasures?: string;
    refinedTargets?: string;
    refinedRemarks?: string;
    constructor(data?: Partial<InitiativeChatHistory>);
}
