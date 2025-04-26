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

@Module({
  controllers: [AppController],
  imports: [
    AiModule,
    AuthModule,
    ReadinesslevelModule,
    StartupModule,
    UserModule,
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [User, Startup, CapsuleProposal, UratQuestion],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
