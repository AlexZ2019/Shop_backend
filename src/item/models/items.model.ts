import { Field, ObjectType } from '@nestjs/graphql';
import ItemModel from './item.model';

@ObjectType()
class ItemsModel {
  @Field()
  total: string;

  @Field(() => [ItemModel])
  items: ItemModel[];
}

export default ItemsModel;
