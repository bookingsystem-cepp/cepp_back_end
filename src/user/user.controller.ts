import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('get-by-id/:id')
  async getUserById(@Param('id') id:string): Promise<User>{
    return await this.userService.findUserById(id);
  }
}
