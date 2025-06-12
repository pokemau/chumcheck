import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from '../user/user.module'; // We'll need access to UserService and UserRepository
import { AuthModule } from '../auth/auth.module'; // Import AuthModule
import { StartupModule } from '../startup/startup.module'; // Import StartupModule

@Module({
  imports: [
    UserModule, // Import UserModule to use UserService
    AuthModule, // Add AuthModule to imports
    StartupModule, // Add StartupModule to imports
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
