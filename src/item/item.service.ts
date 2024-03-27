import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { UpdateItemDto } from './dto/update-item.dto';

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

  async create(item: CreateItemDto): Promise<Item>{
    try{
      const category = await this.categoryService.findById(item.category);
      return await this.ItemModel.create({
        ...item,
        category: category,
        avaliable: item.amount
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
      
      return await this.ItemModel.findOneAndUpdate(
        { _id: item.id },
        { $set: {
          ...item, 
          avaliable: originalItem.avaliable - dif ? originalItem.avaliable - dif >= 0 : 0
        }},
        { new: true, runValidators: true }
      )
    }
    catch(err){
      throw new HttpException('Error to update item: '+err.message,HttpStatus.BAD_REQUEST);
    }
  }
}
