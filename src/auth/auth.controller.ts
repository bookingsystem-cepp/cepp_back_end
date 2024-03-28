import { Controller, Get, Post, UseGuards, Req, Param, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req){}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req:any,@Res() res: Response){
        res.redirect('http://localhost:3000/api/auth/google/callback')
    }

    @Post('generate-token')
    async generateToken(@Body() body:any){
        return await this.authService.generateToken(body.email)
    }
}
