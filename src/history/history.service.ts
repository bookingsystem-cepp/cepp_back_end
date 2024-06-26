import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { History } from './entities/history.entity';
import mongoose from 'mongoose';
import { UserService } from 'src/user/user.service';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name)
    private historyModel: mongoose.Model<History>,
    private userService: UserService,
    @Inject(forwardRef(()=>ItemService))
    private itemService: ItemService,
  ){}

  async findAll(): Promise<History[]> {
    return await this.historyModel.find();
  }

  async findByOwner(userId: string): Promise<History[]>{
    const pending = await this.historyModel.find({owner: userId, status: 'pending'}).populate({path: 'item', select: 'title'}).populate({path: 'borrower', select: 'email'});
    const rest = await this.historyModel.find({owner: userId, status: {$in: ['using', 'return']}}).populate({path: 'item', select: 'title'}).populate({path: 'borrower', select: 'email'}).sort({status: -1});
    return pending.concat(rest);
  }

  async findByBorrower(userId: string): Promise<History[]>{
    const pending = await this.historyModel.find({borrower: userId, status: 'pending'}).populate({path: 'item', select: 'title'});
    const rest = await this.historyModel.find({borrower: userId, status: {$in: ['using', 'return']}}).populate({path: 'item', select: 'title'}).sort({status: -1});
    return pending.concat(rest);
  }

  async create(history: CreateHistoryDto): Promise<History>{
    try{
      const item = await this.itemService.findById(history.itemId);
      if(history.count > item.avaliable){
        throw new HttpException('No item to borrow enough',HttpStatus.BAD_REQUEST);
      }
      const owner = await this.itemService.getOwner(history.itemId);
      const user = await this.userService.findUserById(history.borrowerId);
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + item.period)

      return await this.historyModel.create({
        borrower: user,
        item: item,
        startDate: startDate,
        endDate: endDate,
        owner: owner,
        count: history.count
      });
    }
    catch(err){
      throw new HttpException('Error to create history: '+err.message,err.status);
    }
  }

  async approve(id: string): Promise<History>{
    try{
      const history = await this.historyModel.findById(id);
      if(!history){
        throw new HttpException('History Not Found',HttpStatus.NOT_FOUND);
      }
      else if(history.status !== 'pending'){
        throw new HttpException('This history is wrong status(!pending)',HttpStatus.BAD_REQUEST);
      }
      const newHistory = await this.historyModel.findOneAndUpdate(
        { _id: id },
        { $set: { status: 'using' }},
        { new: true, runValidators: true }
      ).populate({ path: 'item' })
      newHistory.item = await this.itemService.updateAvailable(history.item._id.toString(),-1*newHistory.count);
      return newHistory;
    }
    catch(err){
      throw new HttpException('Error to approve history: '+err.message,err.status);
    }
  }
  
  async returning(id: string){
    try{
      const history = await this.historyModel.findById(id);
      if(!history){
        throw new HttpException('History Not Found',HttpStatus.NOT_FOUND);
      }
      else if(history.status !== 'using'){
        throw new HttpException('This history is wrong status(!using)',HttpStatus.BAD_REQUEST);
      }
      const newHistory = await this.historyModel.findOneAndUpdate(
        { _id: id },
        { $set: { status: 'return' }},
        { new: true, runValidators: true }
      ).populate({ path: 'item' })
      newHistory.item = await this.itemService.updateAvailable(history.item._id.toString(),newHistory.count);
      const today = new Date()
      const startMilliseconds = today.getTime();
      const endMilliseconds = newHistory.endDate.getTime();
      const differenceMilliseconds = endMilliseconds - startMilliseconds;
      const daysDifference = Math.ceil(differenceMilliseconds / (1000 * 60 * 60 * 24));
      if(differenceMilliseconds<0){
        await this.userService.updateScore(newHistory.borrower._id.toString(),-5*daysDifference);
      }
      else{
        await this.userService.updateScore(newHistory.borrower._id.toString(),1);
      }
      return newHistory;
    }
    catch(err){
      throw new HttpException('Error to returning an item: '+err.message,err.status);
    }
  }

  async deleteItem(id: string){
    try{
      const history = await this.historyModel.find({item: id,status: {$in: ['using', 'pending']}})
      if(history.length>0){
        throw new HttpException('Cannot Delete history with in transaction',HttpStatus.BAD_REQUEST);
      }
      return await this.historyModel.deleteMany({item: id});
    }
    catch(err){
      throw new HttpException('Error to delete History in an item: '+err.message,err.status)
    }
  }
}
