import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
@ArgsType()
export default class ItemArgs {
  @Field()
  page: string;

  @Field({ nullable: true })
  pageSize: string;
}
