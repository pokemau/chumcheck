import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ElevateService } from './elevate.service';
import { ElevateStartupDto } from './dto';

@Controller('elevate')
export class ElevateController {
  constructor(private elevateService: ElevateService) {}

  @Post()
  async elevateStartupReadinessLevel(@Body() dto: ElevateStartupDto) {
    return await this.elevateService.elevate(dto);
  }

  @Get(':id')
  async getStartupElevateLogs(@Param('id', ParseIntPipe) startupId: number) {
    return await this.elevateService.getStartupElevateLogs(startupId);
  }
}
