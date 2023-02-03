import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth/services/auth.service';
import { AuthResolver } from './auth/auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/services/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersResolver } from '../users/users.resolver';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '86400s',
        },
      }),
    }),
    TypeOrmModule.forFeature([User, UsersRepository]),
    // TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CurrentUserMiddleware).forRoutes('*');
  // }
}
