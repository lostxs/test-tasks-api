import { ConfigService } from '@nestjs/config';
import { SequelizeOptions } from 'sequelize-typescript';

export const getSequelizeConfig = (configService: ConfigService) => {
  return {
    dialect: 'postgres',
    host: configService.getOrThrow<string>('DATABASE_HOST'),
    port: configService.getOrThrow<number>('DATABASE_PORT'),
    username: configService.getOrThrow<string>('DATABASE_USER'),
    password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
    database: configService.getOrThrow<string>('DATABASE_NAME'),
  } satisfies SequelizeOptions;
};
