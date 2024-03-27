import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';
import { CreateHistoryDto } from './dto/create-history.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('get-all')
  async findAll(): Promise<History[]> {
    return await this.historyService.findAll();
  }

  @Post('create')
  async create(history: CreateHistoryDto): Promise<History>{
    return await this.historyService.create(history);
  }
}
