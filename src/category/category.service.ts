import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UserService } from 'src/user/user.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private CategoryModel: mongoose.Model<Category>,
    private readonly userService: UserService,
  ){}

  async findAll(): Promise<Category[]>{
    return await this.CategoryModel.find();
  }

  async findByOwner(id:string): Promise<Category[]>{
    return await this.CategoryModel.find({owner: id})
  }

  async findById(id:string): Promise<Category>{
    const category = await this.CategoryModel.findById(id);
    if(!category){
      throw new HttpException('Category Not Found',HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async create(category: CreateCategoryDto): Promise<Category>{
    try{
      const user = await this.userService.findUserById(category.ownerId);
      if(!user){
        throw new HttpException('Owner Not Found.',HttpStatus.NOT_FOUND);
      }
      return await this.CategoryModel.create({
        name: category.name,
        owner: user,
        location: category.location,
        description: category.description
      })
    }catch(err){
      throw new HttpException('Error to create category: '+err.message,HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  async update(category: UpdateCategoryDto): Promise<Category>{
    try{
      const newCategory = await this.CategoryModel.findOneAndUpdate(
        { _id: category.id },
        { $set: category },
        { new: true, runValidators: true }       
      );
      if(!newCategory){
        throw new HttpException('Category Not Found',HttpStatus.NOT_FOUND);
      }
      return newCategory;
    }
    catch(err){
      throw new HttpException('Error to Update category: '+err.message,HttpStatus.BAD_REQUEST)
    }
  }
}
