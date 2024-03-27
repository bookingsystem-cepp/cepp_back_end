import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ){}

    googleLogin(req){
        if(!req.user){
            return 'No user from google'
        }
        return req.user
    }

    async generateToken(email: string){
        const user = await this.userService.findUserByEmail(email);
        if(!user){
            throw new HttpException('User Not Found',HttpStatus.NOT_FOUND);
        }
        const payload = { sub: user._id, username: user.name};
        return {
            access_token: this.jwtService.sign(payload,{secret: process.env.JWT_SECRET}),
        };
    }
}