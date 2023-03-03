import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class ItemArgs {
  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  pageSize: number;
}
