import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { buildDataLoaders } from '../utils/dataLoaders';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   autoSchemaFile: './schema.gql',
    //   debug: true,
    //   playground: true,
    // }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      // GraphQLModule.forRoot({
      driver: MercuriusDriver,
      autoSchemaFile: 'schema.gql',
      subscription: true,
      graphiql: true,
      // context: () => ({ dataLoaders: buildDataLoaders() }),  //có thể dataloader khởi chạy từ @Context trong @FieldResolver
    }),
  ],
})
export class GraphqlModule {}
