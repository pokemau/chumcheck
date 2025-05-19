import {
  Controller,
  Get,
  ParseEnumPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { Role } from 'src/entities/enums/role.enum';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(@Query('userRole', new ParseEnumPipe(Role)) userRole: Role) {
    return await this.userService.getUserByRole(userRole);
  }

  @Get('search')
  async getUserByString(@Query('search') query: string) {
    return await this.userService.getUserByString(query);
  }
}
