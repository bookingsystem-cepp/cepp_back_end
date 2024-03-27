import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('get-all')
  async findAll(): Promise<Item[]> {
    return await this.itemService.findAll();
  }

  @Get('get-by-category/:id')
  async findByCategory(@Param('id') id:string): Promise<Item[]>{
    return await this.itemService.findByCategory(id);
  }

  @Get('get-by-id/:id')
  async findById(@Param('id') id:string): Promise<Item>{
    return await this.itemService.findById(id);
  }

  @Post('create')
  async create(@Body() item: CreateItemDto): Promise<Item>{
    return await this.itemService.create(item);
  }

  @Put('update')
  async update(item: UpdateItemDto): Promise<Item>{
    return await this.itemService.update(item);
  }
}
