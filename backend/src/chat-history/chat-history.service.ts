import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { RnsChatHistory } from '../entities/rns-chat-history.entity';
import { InitiativeChatHistory } from '../entities/initiative-chat-history.entity';
import { RoadblockChatHistory } from '../entities/roadblock-chat-history.entity';

@Injectable()
export class ChatHistoryService {
  constructor(private readonly em: EntityManager) {}

  async getRnsChatHistory(rnsId: number) {
    const chatHistory = await this.em.find(
      RnsChatHistory,
      { rns: { id: rnsId } },
      { 
        orderBy: { createdAt: 'ASC' },
        populate: ['rns']
      }
    );

    return chatHistory.map(message => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt,
      refinedDescription: message.refinedDescription
    }));
  }

  async getInitiativeChatHistory(initiativeId: number) {
    const chatHistory = await this.em.find(
      InitiativeChatHistory,
      { initiative: { id: initiativeId } },
      { 
        orderBy: { createdAt: 'ASC' },
        populate: ['initiative']
      }
    );

    return chatHistory.map(message => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt,
      refinedDescription: message.refinedDescription,
      refinedMeasures: message.refinedMeasures,
      refinedTargets: message.refinedTargets,
      refinedRemarks: message.refinedRemarks
    }));
  }

  async getRoadblockChatHistory(roadblockId: number) {
    const chatHistory = await this.em.find(
      RoadblockChatHistory,
      { roadblock: { id: roadblockId } },
      { 
        orderBy: { createdAt: 'ASC' },
        populate: ['roadblock']
      }
    );

    return chatHistory.map(message => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt,
      refinedDescription: message.refinedDescription,
      refinedFix: message.refinedFix
    }));
  }
} 