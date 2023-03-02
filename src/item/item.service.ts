import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Item from './entity/item.entity';
import { Repository } from 'typeorm';

@Injectable()
class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}
  public async getItems(page: string, pageSize = '9') {
    const pageSizeNumber = Number(pageSize);
    const lastItemCount = Number(page) * pageSizeNumber;
    const skip = lastItemCount - pageSizeNumber;
    const [result, total] = await this.itemRepository.findAndCount({
      skip,
      take: pageSizeNumber,
    });
    return {
      items: result,
      total,
    };
  }
}

export default ItemService;