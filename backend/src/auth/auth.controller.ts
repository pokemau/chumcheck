import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthSignInDto } from './dto';
import { CreateUserDto } from 'src/admin/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }
  @Post('/signin')
  signin(@Body() dto: AuthSignInDto) {
    return this.authService.signin(dto);
  }
}
