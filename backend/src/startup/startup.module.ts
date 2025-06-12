import { Module } from '@nestjs/common';
import { StartupService } from './startup.service';
import { StartupController } from './startup.controller';
import { AiModule } from 'src/ai/ai.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Startup } from 'src/entities/startup.entity';
import { User } from 'src/entities/user.entity';
import { CapsuleProposal } from 'src/entities/capsule-proposal.entity';

@Module({
  imports: [
    AiModule,
    MikroOrmModule.forFeature({ entities: [Startup, User, CapsuleProposal] }),
  ],
  providers: [StartupService],
  controllers: [StartupController],
  exports: [StartupService], // Export StartupService
})
export class StartupModule {}
