import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../../../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { LoginInput } from '../../../users/dto/LoginInput';
import { User } from '../../../users/entities/user.entity';
import { RegisterInput } from '../../../users/dto/RegisterInput';
import { LoggedUserOutput } from '../../../users/dto/logged-user.output';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(registerInput: RegisterInput): Promise<User> {
    return this.usersRepository.createUser(registerInput);
  }

  async signIn(loginInput: LoginInput): Promise<LoggedUserOutput> {
    const { usernameOrEmail, password } = loginInput;
    const [user] = await this.usersRepository.find(
      usernameOrEmail.includes('@')
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    );

    if (user && (await bcrypt.compare(password, user.password))) {
      let username = user.username;
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      // console.log(accessToken);
      // return user;
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
