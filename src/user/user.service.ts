import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

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
    const user = await this.UserModel.findById(userId)
    if(!user){
      throw new HttpException('User Not Found: '+userId,HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.UserModel.findOne({email: email})
  }

  async update(user: UpdateUserDto): Promise<User>{
    try{
      return await this.UserModel.findOneAndUpdate(
        { _id: user.id },
        { $set: user },
        { new: true, runValidators: true } 
      )
    }
    catch(err){
      throw new HttpException('Error to update user: '+err.message,err.stataus);
    }
  }

  async updateScore(id: string, count: number): Promise<User>{
    try{
        const user = await this.UserModel.findById(id)
        if(!user){
          throw new HttpException('User Not Found',HttpStatus.NOT_FOUND);
        }
        let newScore = user.scores+count
        if(newScore > 100){
          newScore = 100
        }
        else if(newScore < 0){
          newScore = 0
        }
        return await this.UserModel.findOneAndUpdate(
          { _id: user.id },
          { $set: { scores: newScore }},
          { new: true, runValidators: true }
        )
    }
    catch(err){
      throw new HttpException('Error to update score: '+err.message,err.status);
    }
  }
}
