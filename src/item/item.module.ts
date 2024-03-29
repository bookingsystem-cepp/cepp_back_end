import { Module, forwardRef } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './entities/item.entity';
import { CategoryModule } from 'src/category/category.module';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Item.name, schema: ItemSchema}]),
    forwardRef(()=>CategoryModule),
    forwardRef(()=>HistoryModule) 
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule {}
