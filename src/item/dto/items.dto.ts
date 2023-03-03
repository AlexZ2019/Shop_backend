import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class ItemsArgs {
  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  pageSize: number;
}
