import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { UserModule } from 'src/user/user.module';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}]),
    UserModule,
    forwardRef(()=>ItemModule),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
