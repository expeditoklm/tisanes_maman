"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, configService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const user = await this.prismaService.user.findUnique({ where: { email: signInDto.email } });
        if (!user)
            throw new common_1.ConflictException('User does not exist');
        const isMatch = await this.prismaService.user.findFirstOrThrow({ where: { password: signInDto.password } });
        if (!isMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = {
            sub: user.userId,
            email: user.email
        };
        const token = this.jwtService.sign(payload, { expiresIn: '24h', secret: this.configService.get('SECRET_KEY') });
        return {
            tohen: token,
            user: {
                userName: user.userName,
                email: user.email,
            },
            data: 'User signed in successfully'
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map