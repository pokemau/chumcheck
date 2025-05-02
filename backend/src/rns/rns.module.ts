import { Module } from '@nestjs/common';
import { RnsController } from './rns.controller';
import { RnsService } from './rns.service';

@Module({
  controllers: [RnsController],
  providers: [RnsService]
})
export class RnsModule {}
