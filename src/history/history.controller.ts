import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';
import { CreateHistoryDto } from './dto/create-history.dto';
import { ApproveDTO } from './dto/approve.dto';
import { ReturnDTO } from './dto/return.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('get-all')
  async findAll(): Promise<History[]> {
    return await this.historyService.findAll();
  }

  @Get('get-by-owner/:id')
  async findByOwner(@Param('id') userId: string): Promise<History[]>{
    return await this.historyService.findByOwner(userId);
  }

  @Get('get-by-borrower/:id')
  async findByBorrower(@Param('id') userId: string): Promise<History[]>{
    return await this.historyService.findByBorrower(userId);
  }

  @Post('create')
  async create(@Body() history: CreateHistoryDto): Promise<History>{
    return await this.historyService.create(history);
  }

  @Post('approve')
  async approve(@Body() approve: ApproveDTO): Promise<History>{
    return await this.historyService.approve(approve.historyId);
  }

  @Post('returning')
  async returning(@Body() returned: ReturnDTO){
    return await this.historyService.returning(returned.historyId);
  }
}
