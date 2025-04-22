import { Module } from '@nestjs/common';
import { ReadinesslevelController } from './readinesslevel.controller';
import { ReadinesslevelService } from './readinesslevel.service';

@Module({
  controllers: [ReadinesslevelController],
  providers: [ReadinesslevelService]
})
export class ReadinesslevelModule {}
