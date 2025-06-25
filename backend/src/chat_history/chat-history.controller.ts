import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('chat-history')
// @UseGuards(JwtGuard)
export class ChatHistoryController {
  constructor(private chatHistoryService: ChatHistoryService) {}

  @Get('rns/:id')
  async getRnsChatHistory(@Param('id', ParseIntPipe) rnsId: number) {
    return await this.chatHistoryService.getRnsChatHistory(rnsId);
  }

  @Get('initiatives/:id')
  async getInitiativeChatHistory(@Param('id', ParseIntPipe) initiativeId: number) {
    return await this.chatHistoryService.getInitiativeChatHistory(initiativeId);
  }

  @Get('roadblocks/:id')
  async getRoadblockChatHistory(@Param('id', ParseIntPipe) roadblockId: number) {
    return await this.chatHistoryService.getRoadblockChatHistory(roadblockId);
  }

  @Get('rna/:id')
  async getRnaChatHistory(@Param('id', ParseIntPipe) rnaId: number) {
    return await this.chatHistoryService.getRnaChatHistory(rnaId);
  }
} 