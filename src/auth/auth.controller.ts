import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { SignInDto } from './dto/auth.dto';
import {Request} from 'express' ;
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}
   
    @Post('signin')
    signIn(@Body() signInDto : SignInDto) {
        return this.authService.signIn(signInDto)
    }



 
}
