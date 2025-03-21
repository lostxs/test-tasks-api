import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { TaskModel } from '@/modules/task/repository/task.model';
import { TaskModule } from '@/modules/task/task.module';

import { getSequelizeConfig } from './config/sequelize.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...getSequelizeConfig(configService),
        autoLoadModels: true,
        models: [TaskModel],
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TaskModule,
  ],
})
export class CoreModule {}
