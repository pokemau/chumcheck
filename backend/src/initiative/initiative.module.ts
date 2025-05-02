import { Module } from '@nestjs/common';
import { InitiativeController } from './initiative.controller';
import { InitiativeService } from './initiative.service';

@Module({
  controllers: [InitiativeController],
  providers: [InitiativeService]
})
export class InitiativeModule {}
