import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RnsService } from './rns.service';
import { CreateRnsDto } from './dto';

@Controller('rns')
export class RnsController {
  constructor(private rnsService: RnsService) {}

  @Get()
  async getStartupRns(@Query('startupId', ParseIntPipe) startupId: number) {
    return await this.rnsService.getStartupRns(startupId);
  }

  @Post()
  async createRns(@Body() dto: CreateRnsDto) {
    return await this.rnsService.createRns(dto);
  }
}
