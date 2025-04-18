import { SignInDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        tohen: string;
        user: {
            userName: string;
            email: string;
        };
        data: string;
    }>;
}
