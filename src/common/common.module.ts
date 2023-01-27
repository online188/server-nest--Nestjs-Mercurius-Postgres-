import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql.module';

import { ConfigModule } from './config.module';
import { AuthModule } from './auth.module';
import { TypeOrmPostgresModule } from './postgres.module';

@Module({
  imports: [ConfigModule, GraphqlModule, TypeOrmPostgresModule, AuthModule],
  exports: [ConfigModule, GraphqlModule, TypeOrmPostgresModule, AuthModule],
})
export class CommonModule {}
