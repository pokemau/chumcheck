import { Module } from '@nestjs/common';
import { StartupService } from './startup.service';
import { StartupController } from './startup.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule],
  providers: [StartupService],
  controllers: [StartupController],
})
export class StartupModule {}
