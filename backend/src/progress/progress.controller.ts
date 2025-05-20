import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get(':startupId/progress-report')
  async getProgressReport(@Param('startupId', ParseIntPipe) startupId: number) {
    return await this.progressService.getProgressReport(startupId);
  }
}
