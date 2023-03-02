import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ItemService from './item.service';
import ItemResolver from './item.resolver';
import Item from './entity/item.entity';
import Token from '../auth/entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Token])],
  providers: [ItemService, ItemResolver],
  exports: [ItemService],
})
export default class ItemModule {}
