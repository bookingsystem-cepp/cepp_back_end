import { Controller, Get, Post, UseGuards, Req, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req){}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req:any){
        return this.authService.googleLogin(req);
    }

    @Post('generate-token')
    async generateToken(@Body() body:any){
        return await this.authService.generateToken(body.email)
    }
}
