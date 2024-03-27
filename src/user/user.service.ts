import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
  ){}

  async findAll(): Promise<User[]> {
    return await this.UserModel.find();
  }

  async findUserById(userId: string): Promise<User> {
    return await this.UserModel.findById(userId)
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.UserModel.findOne({email: email})
  }
}
