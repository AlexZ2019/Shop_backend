import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class ItemModel {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  description: string;
}

@ObjectType()
class ItemsModel {
  @Field()
  total: string;

  @Field(() => [ItemModel])
  items: ItemModel[];
}

export default ItemsModel;
