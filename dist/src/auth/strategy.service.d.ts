import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
type Payload = {
    sub: number;
    email: string;
};
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prismaService;
    constructor(configService: ConfigService, prismaService: PrismaService);
    validate(payload: Payload): Promise<{
        userId: string;
        userName: string;
        email: string;
        password: string;
        created_at: Date;
        updated_at: Date;
    }>;
}
export {};
