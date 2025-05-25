import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { RnsChatHistory } from '../entities/rns-chat-history.entity';

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
} 