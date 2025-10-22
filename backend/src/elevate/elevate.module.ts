import { Module } from '@nestjs/common';
import { ElevateService } from './elevate.service';
import { ElevateController } from './elevate.controller';

@Module({
  providers: [ElevateService],
  controllers: [ElevateController],
})
export class ElevateModule {}
