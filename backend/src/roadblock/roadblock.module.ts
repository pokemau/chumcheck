import { Module } from '@nestjs/common';
import { RoadblockService } from './roadblock.service';
import { RoadblockController } from './roadblock.controller';
import { AiModule } from 'src/ai/ai.module';
@Module({
  imports: [AiModule],
  providers: [RoadblockService],
  controllers: [RoadblockController]
})
export class RoadblockModule {}
