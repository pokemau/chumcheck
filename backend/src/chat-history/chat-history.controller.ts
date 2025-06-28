import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';

@Controller('chat-history')
export class ChatHistoryController {
  constructor(private chatHistoryService: ChatHistoryService) {}

  @Get('rns/:id')
  async getRnsChatHistory(@Param('id', ParseIntPipe) rnsId: number) {
    return await this.chatHistoryService.getRnsChatHistory(rnsId);
  }

  @Get('initiatives/:id')
  async getInitiativeChatHistory(
    @Param('id', ParseIntPipe) initiativeId: number,
  ) {
    return await this.chatHistoryService.getInitiativeChatHistory(initiativeId);
  }

  @Get('roadblocks/:id')
  async getRoadblockChatHistory(
    @Param('id', ParseIntPipe) roadblockId: number,
  ) {
    return await this.chatHistoryService.getRoadblockChatHistory(roadblockId);
  }
}

