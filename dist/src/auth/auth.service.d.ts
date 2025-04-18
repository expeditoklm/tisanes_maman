import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    private readonly configService;
    constructor(prismaService: PrismaService, jwtService: JwtService, configService: ConfigService);
    signIn(signInDto: SignInDto): Promise<{
        tohen: string;
        user: {
            userName: string;
            email: string;
        };
        data: string;
    }>;
}
