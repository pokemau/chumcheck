import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { StartupModule } from './startup/startup.module';
import { ReadinesslevelModule } from './readinesslevel/readinesslevel.module';
import { AiModule } from './ai/ai.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from './entities/user.entity';
import { Startup } from './entities/startup.entity';
import { CapsuleProposal } from './entities/capsule-proposal.entity';
import { UratQuestion } from './entities/urat-question.entity';
import { AppController } from './app.controller';
import { RoadblockModule } from './roadblock/roadblock.module';
import { RnaModule } from './rna/rna.module';
import { RnsModule } from './rns/rns.module';
import { InitiativeModule } from './initiative/initiative.module';
import { ProgressModule } from './progress/progress.module';
import { OverviewModule } from './overview/overview.module';

@Module({
  controllers: [AppController],
  imports: [
    AiModule,
    AuthModule,
    StartupModule,
    UserModule,
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [User, Startup, CapsuleProposal, UratQuestion],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ReadinesslevelModule,
    RnaModule,
    RnsModule,
    InitiativeModule,
    RoadblockModule,
    ProgressModule,
    OverviewModule,
  ],
  providers: [AppService],
})
export class AppModule {}
