import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, AuthSignInDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private em: EntityManager,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);

      const user = new User();
      user.email = dto.email;
      user.hash = hash;
      user.firstName = dto.firstName;
      user.lastName = dto.lastName;

      await this.em.persistAndFlush(user);
      return this.signToken(
        user.id,
        user.email,
        user.role,
        user.firstName,
        user.lastName,
      );
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: AuthSignInDto) {
    const user = await this.em.findOne(User, { email: dto.email });
    if (!user) throw new ForbiddenException('User not found.');

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Wrong Password');

    return this.signToken(
      user.id,
      user.email,
      user.role,
      user.firstName,
      user.lastName,
    );
  }

  async signToken(
    userId: number,
    email: string,
    role: string,
    firstName: string | undefined,
    lastName: string | undefined,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      role,
      firstName,
      lastName,
    };

    const secret = this.configService.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
