import { Module } from '@nestjs/common';
import { InitiativeController } from './initiative.controller';
import { InitiativeService } from './initiative.service';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [InitiativeController],
  providers: [InitiativeService],
})
export class InitiativeModule {}
