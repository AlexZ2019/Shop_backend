import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class ItemArgs {
  @Field()
  id: number;
}
