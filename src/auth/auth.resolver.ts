import { Body, Controller, Post } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoggedUserOutput } from './dto/logged-user.output';
import { LoginInput } from './dto/LoginInput';
import { RegisterInput } from './dto/RegisterInput';
import { User } from './user.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  signUp(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.signUp(registerInput);
  }

  @Mutation(() => LoggedUserOutput)
  signIn(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.signIn(loginInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.authService.findAll();
  }
}
