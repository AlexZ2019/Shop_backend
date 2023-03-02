import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ItemService from './item.service';
import { Injectable, UseGuards } from '@nestjs/common';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
import ItemModel from './models/item.model';
import Token from '../auth/entities/token.entity';
import ItemArgs from './dto/item.dto';

@Injectable()
@Resolver()
class ItemResolver {
  constructor(
    private readonly itemService: ItemService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  @Query(() => ItemModel)
  @UseGuards(AccessTokenGuard)
  public async getItems(@Args() args: ItemArgs) {
    return this.itemService.getItems(args.page, args.pageSize);
  }
}

export default ItemResolver;
