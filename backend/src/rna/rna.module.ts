import { Module } from '@nestjs/common';
import { RnaController } from './rna.controller';
import { RnaService } from './rna.service';

@Module({
  controllers: [RnaController],
  providers: [RnaService]
})
export class RnaModule {}
