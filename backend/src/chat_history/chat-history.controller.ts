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
export class ChatHistoryController {
  constructor(private chatHistoryService: ChatHistoryService) {}

  @Get('rns/:id')
  async getRnsChatHistory(@Param('id', ParseIntPipe) rnsId: number) {
    return await this.chatHistoryService.getRnsChatHistory(rnsId);
  }
} 