import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from './dto/RegisterInput';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(registerInput: RegisterInput): Promise<User> {
    const { username, password } = registerInput;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    registerInput.password = hashedPassword;
    const user = this.create(registerInput);

    try {
      return await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException(`${error.detail}`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
