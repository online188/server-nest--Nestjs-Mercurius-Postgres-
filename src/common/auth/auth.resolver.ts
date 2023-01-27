import { Body, Controller, Post } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './services/auth.service';
import { LoggedUserOutput } from '../../users/dto/logged-user.output';
import { LoginInput } from '../../users/dto/LoginInput';
import { RegisterInput } from '../../users/dto/RegisterInput';
import { User } from '../../users/entities/user.entity';

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
}
