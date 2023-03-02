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
    return await this.itemRepository.findAndCount({
      order: {
        id: 'DESC',
      },
      skip,
      take: pageSizeNumber,
    });
  }
}

export default ItemService;
