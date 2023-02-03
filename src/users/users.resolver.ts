import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';

import { RegisterInput } from './dto/RegisterInput';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginInput } from './dto/LoginInput';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'me' })
  async me(@Context() { req }): Promise<User | undefined | null> {
    // console.log(req);
    console.log(req.user);
    return req.user;
  }

  @Mutation(() => User)
  createUser(@Args('registerInput') registerInput: RegisterInput) {
    return this.usersService.create(registerInput);
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthGuard())
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
