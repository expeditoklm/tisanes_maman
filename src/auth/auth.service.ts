import { Body, ConflictException, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService : PrismaService,
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService
        
    ) {}


     async signIn(signInDto : SignInDto) {

        const { email, password } = signInDto;
        const  user = await this.prismaService.user.findUnique({ where : { email : signInDto.email } });
        if (!user) throw new ConflictException('User does not exist');
        const isMatch = await this.prismaService.user.findFirstOrThrow({ where : { password : signInDto.password } });
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');
        const payload = {
            sub : user.userId ,
            email : user.email
        }
        const token = this.jwtService.sign(payload, { expiresIn : '24h',secret : this.configService.get('SECRET_KEY')  });
        return {
            tohen : token,
            user : {
                userName : user.userName,
                email : user.email,
            },
            data : 'User signed in successfully'
        }
    }

}
