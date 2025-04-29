import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get()
  async getUsers(@Query('user_type') userType: string, @Req() req: Request) {
    if (userType === 'ME') {
      return {
        message: 'IS ME',
      };
    }
    return {
      message: 'IS NOT ME',
    };
  }
}
