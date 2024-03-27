import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('get-all')
  async getAllCategory(): Promise<Category[]>{
    return await this.categoryService.findAll();
  }

  @Get('get-by-owner/:id')
  async getByOwner(@Param('id') id:string): Promise<Category[]>{
    return await this.categoryService.findByOwner(id);
  }

  @Get('get-by-id/:id')
  async getById(@Param('id') id:string): Promise<Category>{
    return this.categoryService.findById(id);
  }
  
  @Post('create')
  async create(@Body() category: CreateCategoryDto): Promise<Category>{
      return await this.categoryService.create(category);
  }

  @Put('update')
  async update(@Body() category: UpdateCategoryDto): Promise<Category>{
    return await this.categoryService.update(category)
  }
} 
