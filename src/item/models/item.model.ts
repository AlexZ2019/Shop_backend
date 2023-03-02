import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class ItemModel {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  description: string;
}

export default ItemModel;
