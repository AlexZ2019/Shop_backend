import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ItemService from './item.service';
import ItemResolver from './item.resolver';
import Item from './entity/item.entity';
import Token from '../auth/entities/token.entity';
import { MailerService } from '../mailer/mailer.service';
import User from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Token, User])],
  providers: [ItemService, ItemResolver, MailerService],
  exports: [ItemService],
})
export default class ItemModule {}
