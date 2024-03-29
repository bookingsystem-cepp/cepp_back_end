import { Module, forwardRef } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from './entities/history.entity';
import { UserModule } from 'src/user/user.module';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: History.name, schema: HistorySchema}]),
    UserModule,
    forwardRef(()=>ItemModule) ,
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService]
})
export class HistoryModule {}
