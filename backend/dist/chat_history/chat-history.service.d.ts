import { EntityManager } from '@mikro-orm/core';
export declare class ChatHistoryService {
    private readonly em;
    constructor(em: EntityManager);
    getRnsChatHistory(rnsId: number): Promise<{
        id: number;
        role: string;
        content: string;
        createdAt: Date;
        refinedDescription: string | undefined;
    }[]>;
    getInitiativeChatHistory(initiativeId: number): Promise<{
        id: number;
        role: string;
        content: string;
        createdAt: Date;
        refinedDescription: string | undefined;
        refinedMeasures: string | undefined;
        refinedTargets: string | undefined;
        refinedRemarks: string | undefined;
    }[]>;
    getRoadblockChatHistory(roadblockId: number): Promise<{
        id: number;
        role: string;
        content: string;
        createdAt: Date;
        refinedDescription: string | undefined;
        refinedFix: string | undefined;
    }[]>;
    getRnaChatHistory(rnaId: number): Promise<{
        id: number;
        role: string;
        content: string;
        createdAt: Date;
        refinedRna: string | undefined;
    }[]>;
}
