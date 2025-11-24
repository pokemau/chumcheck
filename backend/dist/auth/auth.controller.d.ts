import { AuthService } from './auth.service';
import { AuthDto, AuthSignInDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signin(dto: AuthSignInDto): Promise<{
        access_token: string;
    }>;
}
