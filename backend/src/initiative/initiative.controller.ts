import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { InitiativeService } from './initiative.service';

@Controller('initiatives')
export class InitiativeController {
    constructor(private initiativeService: InitiativeService) {}

    @Get()
    async getStartupInitiative(@Query('startupId', ParseIntPipe) startupId: number) {
    return await this.initiativeService.getStartupInitiative(startupId);
    }
}
