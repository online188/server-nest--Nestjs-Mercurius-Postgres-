import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RegisterInput } from './dto/RegisterInput';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginInput } from './dto/LoginInput';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  signin(@Args('loginInput') loginInput: LoginInput) {
    return this.usersService.signin(loginInput);
  }

  @Mutation(() => User)
  signup(@Args('registerInput') registerInput: RegisterInput) {
    return this.usersService.signup(registerInput);
  }

  @Mutation(() => User)
  createUser(@Args('registerInput') registerInput: RegisterInput) {
    return this.usersService.create(registerInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('userId', { type: () => String }) userId: string) {
    return this.usersService.findOne(userId);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.userId, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('userId', { type: () => String }) userId: string) {
    return this.usersService.remove(userId);
  }
}
