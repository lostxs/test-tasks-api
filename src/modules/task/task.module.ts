import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TaskModel } from './repository/task.model';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [SequelizeModule.forFeature([TaskModel])],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
})
export class TaskModule {}
