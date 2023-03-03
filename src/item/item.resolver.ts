import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ItemService from './item.service';
import { Injectable, UseGuards } from '@nestjs/common';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
import Token from '../auth/entities/token.entity';
import ItemsArgs from './dto/items.dto';
import ItemArgs from './dto/item.dto';
import ItemsModel from './models/items.model';
import ItemModel from './models/item.model';

@Injectable()
@Resolver()
class ItemResolver {
  constructor(
    private readonly itemService: ItemService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  @Query(() => ItemsModel)
  @UseGuards(AccessTokenGuard)
  public async getItems(@Args() args: ItemsArgs) {
    return this.itemService.getItems(args.page, args.pageSize);
  }

  @Query(() => ItemModel)
  // @UseGuards(AccessTokenGuard)
  public async getItem(@Args() args: ItemArgs) {
    return this.itemService.getItem(args.id);
  }
}

export default ItemResolver;
