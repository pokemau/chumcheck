import { AuthDto, AuthSignInDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EntityManager } from '@mikro-orm/postgresql';
export declare class AuthService {
    private em;
    private jwtService;
    private configService;
    constructor(em: EntityManager, jwtService: JwtService, configService: ConfigService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signin(dto: AuthSignInDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, email: string, role: string, firstName: string | undefined, lastName: string | undefined): Promise<{
        access_token: string;
    }>;
}
