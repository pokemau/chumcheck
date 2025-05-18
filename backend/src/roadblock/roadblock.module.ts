import { Module } from '@nestjs/common';
import { RoadblockService } from './roadblock.service';
import { RoadblockController } from './roadblock.controller';

@Module({
  providers: [RoadblockService],
  controllers: [RoadblockController]
})
export class RoadblockModule {}
