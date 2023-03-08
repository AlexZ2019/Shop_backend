import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Item from './entity/item.entity';
import { Repository } from 'typeorm';
import { MailerService } from '../mailer/mailer.service';
import User from '../user/entity/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private mailerService: MailerService,
  ) {}
  public async getItems(page = 1, pageSize = 9) {
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

  public async getItem(id: number) {
    return await this.itemRepository.findOneBy({ id });
  }

  @Cron(CronExpression.EVERY_8_HOURS)
  private async sendLastItems() {
    const itemsByLastDate = await this.itemRepository.find({
      order: { created_at: 'DESC' },
    });
    const newItems = itemsByLastDate.reduce((acc, item) => {
      if (
        new Date(item.created_at).getDate() ===
        new Date(itemsByLastDate[0].created_at).getDate()
      ) {
        return `${acc}, ${item.title}`;
      }
    }, '');
    const emails = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.email'])
      .getMany();
    emails.forEach((user) => {
      try {
        this.mailerService.sendEmail({
          to: user.email,
          text: newItems,
          subject: 'New Items',
        });
      } catch (e) {
        console.log(e);
      }
    });
  }
}

export default ItemService;
