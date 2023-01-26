import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @IsString()
  @Field()
  usernameOrEmail: string;

  @IsString()
  @Field()
  password: string;
}
