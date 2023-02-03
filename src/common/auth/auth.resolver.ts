import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from './services/auth.service';
import { LoggedUserOutput } from '../../users/dto/logged-user.output';
import { LoginInput } from '../../users/dto/LoginInput';
import { RegisterInput } from '../../users/dto/RegisterInput';
import { User } from '../../users/entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  // @UseGuards(JwtAuthGuard)
  // @Query(() => User, { name: 'me' })
  // getUser(@Context() req) {
  //   const user: User = req.req.user;
  //   console.log('Query get Me Request: ', req.req.user);
  //   return user;
  // }
}
