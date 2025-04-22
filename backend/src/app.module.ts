import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { StartupController } from './startup/startup.controller';
import { StartupModule } from './startup/startup.module';
import { ReadinesslevelModule } from './readinesslevel/readinesslevel.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    AiModule,
    AuthModule,
    PrismaModule,
    ReadinesslevelModule,
    StartupModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
