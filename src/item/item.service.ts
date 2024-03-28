import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { UpdateItemDto } from './dto/update-item.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name)
    private ItemModel: mongoose.Model<Item>,
    private readonly categoryService: CategoryService,
  ){}

  async findAll(): Promise<Item[]> {
    return await this.ItemModel.find()
  }

  async findByCategory(id:string): Promise<Item[]>{
    return await this.ItemModel.find({category: id})
  }

  async findById(id: string): Promise<Item>{
    const item = await this.ItemModel.findById(id);
    if(!item){
      throw new HttpException('Item Not Found',HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async findByOwner(id: string): Promise<Item[]>{
    return await this.ItemModel.find({owner: id}).sort({category: 1});
  }

  async getOwner(id: string): Promise<User>{
    const item = await this.ItemModel.findById(id).populate({ path: 'category',select:'owner'});
    if(!item){
      throw new HttpException('Item Not Found',HttpStatus.NOT_FOUND);
    }
    return item.category.owner
  }

  async create(item: CreateItemDto): Promise<Item>{
    try{
      const category = await this.categoryService.findById(item.category);
      return await this.ItemModel.create({
        ...item,
        category: category,
        avaliable: item.amount,
        owner: category.owner
      });
    }
    catch(err){
      throw new HttpException('Error to create item: '+err.message,HttpStatus.BAD_REQUEST)
    }
  }
 
  async update(item: UpdateItemDto): Promise<Item>{
    try{
      const originalItem = await this.ItemModel.findById(item.id);
      if(!originalItem){
        throw new HttpException('Item Not Found',HttpStatus.NOT_FOUND);
      }
      const dif = item.amount - originalItem.amount;
      let avaliable = originalItem.avaliable + dif
      if(originalItem.avaliable - dif < 0){
        avaliable=0
      }
      
      return await this.ItemModel.findOneAndUpdate(
        { _id: item.id },
        { $set: {
          ...item, 
          avaliable: avaliable
        }},
        { new: true, runValidators: true }
      )
    }
    catch(err){
      console.log(err.message)
      throw new HttpException('Error to update item: '+err.message,HttpStatus.BAD_REQUEST);
    }
  }

  async updateAvailable(id: string,count: number): Promise<Item>{
    try{
      const item = await this.ItemModel.findById(id);
      if(item.avaliable + count < 0){
        throw new HttpException('No item To Borrow',HttpStatus.BAD_REQUEST);
      }
      else if(item.avaliable + count > item.amount){
        throw new HttpException('Available more than Amount',HttpStatus.BAD_REQUEST);
      }
      return await this.ItemModel.findOneAndUpdate(
        { _id: item._id },
        { $set: { avaliable: item.avaliable + count}},
        { new: true, runValidators: true }
      )
    }
    catch(err){
      throw new HttpException('Error to update available: '+err.message,err.status);
    }
  } 
}
