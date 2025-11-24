import { Roadblock } from './roadblock.entity';
export declare class RoadblockChatHistory {
    id: number;
    roadblock: Roadblock;
    role: string;
    content: string;
    createdAt: Date;
    refinedDescription?: string;
    refinedFix?: string;
    constructor(data?: Partial<RoadblockChatHistory>);
}
