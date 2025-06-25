import { Module } from '@nestjs/common';
import { RnaController } from './rna.controller';
import { RnaService } from './rna.service';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [RnaController],
  providers: [RnaService]
})
export class RnaModule {}
