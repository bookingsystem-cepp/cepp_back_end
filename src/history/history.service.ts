import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { History } from './entities/history.entity';
import mongoose from 'mongoose';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name)
    private historyModel: mongoose.Model<History>
  ){}

  async findAll(): Promise<History[]> {
    return await this.historyModel.find();
  }

  async create(history: CreateHistoryDto): Promise<History>{
    try{
      return 
    }
    catch(err){
      throw new HttpException('Error to create history: '+err.message,HttpStatus.BAD_REQUEST);
    }
  }

}
