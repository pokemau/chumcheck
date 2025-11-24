import { Rns } from './rns.entity';
export declare class RnsChatHistory {
    id: number;
    rns: Rns;
    role: string;
    content: string;
    createdAt: Date;
    refinedDescription?: string;
    constructor(data?: Partial<RnsChatHistory>);
}
