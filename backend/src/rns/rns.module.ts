import { Module } from '@nestjs/common';
import { RnsController } from './rns.controller';
import { RnsService } from './rns.service';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [RnsController],
  providers: [RnsService]
})
export class RnsModule {}
