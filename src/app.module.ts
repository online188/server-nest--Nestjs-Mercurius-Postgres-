import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AuthModule } from './common/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { CommonModule } from './common/common.module';
import { PostModule } from './post/post.module';
dotenv.config();

@Module({
  imports: [UsersModule, CommonModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
