import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user.id, user.email, user.role);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') throw new ForbiddenException('Email Taken');
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('No user found');

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Wrong Password');

    return this.signToken(user.id, user.email, user.role);
  }

  async signToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      role,
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
