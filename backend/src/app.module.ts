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
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Module({
  controllers: [AppController],
  imports: [
    AiModule,
    AuthModule,
    StartupModule,
    UserModule,
    MikroOrmModule.forRoot({
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
      entities: ['./dist/**/*.entity.js'],
      entitiesTs: ['./src/**/*.entity.ts'],
      debug: false,
      driver: PostgreSqlDriver,
      driverOptions: {
        connection: {
          ssl: { rejectUnauthorized: false },
        },
      },
    }),
    MikroOrmModule.forFeature({
      entities: [User, Startup, CapsuleProposal, UratQuestion, RnaChatHistory],
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
    ChatHistoryModule,
    ElevateModule,
    AdminModule,
  ],
  providers: [AppService],
})
export class AppModule {}
