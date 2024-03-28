import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Put('edit')
  async edit(user: UpdateUserDto): Promise<User>{
    return await this.userService.update(user);
  }
}
