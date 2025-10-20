import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { StartupModule } from './startup/startup.module';
import { ReadinesslevelModule } from './readinesslevel/readinesslevel.module';
import { AiModule } from './ai/ai.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ChatHistoryModule } from './chat_history/chat-history.module';
import { AdminModule } from './admin/admin.module';
import { User } from './entities/user.entity';
import { Startup } from './entities/startup.entity';
import { CapsuleProposal } from './entities/capsule-proposal.entity';
import { UratQuestion } from './entities/urat-question.entity';
import { RnaChatHistory } from './entities/rna-chat-history.entity';
import { AppController } from './app.controller';
import { RoadblockModule } from './roadblock/roadblock.module';
import { RnaModule } from './rna/rna.module';
import { RnsModule } from './rns/rns.module';
import { InitiativeModule } from './initiative/initiative.module';
import { ProgressModule } from './progress/progress.module';
import { OverviewModule } from './overview/overview.module';
import { ElevateModule } from './elevate/elevate.module';
import { AssessmentModule } from './assessment/assessment.module';
import { UploadModule } from './upload/upload.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [User, Startup, CapsuleProposal, UratQuestion, RnaChatHistory],
    }),
    AiModule,
    AuthModule,
    StartupModule,
    UserModule,
    ReadinesslevelModule,
    RnaModule,
    RnsModule,
    InitiativeModule,
    RoadblockModule,
    ProgressModule,
    OverviewModule,
    ChatHistoryModule,
    ElevateModule,
    UploadModule,
    AdminModule,
    AssessmentModule,
  ],
  providers: [AppService],
})
export class AppModule {}
