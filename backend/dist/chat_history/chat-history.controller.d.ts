import { ChatHistoryService } from './chat-history.service';
export declare class ChatHistoryController {
    private chatHistoryService;
    constructor(chatHistoryService: ChatHistoryService);
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
