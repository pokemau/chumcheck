import { StartupRNA } from './rna.entity';
export declare class RnaChatHistory {
    id: number;
    rna: StartupRNA;
    role: string;
    content: string;
    createdAt: Date;
    refinedRna?: string;
    constructor(data?: Partial<RnaChatHistory>);
}
