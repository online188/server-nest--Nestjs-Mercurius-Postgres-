import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configValidationSchema } from '../config.schema';

@Module({
  imports: [
    // NestConfigModule.forRoot({
    //   envFilePath: ['.env'],
    //   isGlobal: true,
    // }),
    NestConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
  ],
})
export class ConfigModule {}
