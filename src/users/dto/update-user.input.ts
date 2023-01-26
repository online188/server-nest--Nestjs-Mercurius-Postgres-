import { RegisterInput } from './RegisterInput';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(RegisterInput) {
  @Field(() => String)
  userId: string;
}
