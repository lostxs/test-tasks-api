import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { TaskModel } from './task.model';

@Injectable()
export class TaskRepository {
  private readonly logger = new Logger(TaskRepository.name);

  constructor(
    @InjectModel(TaskModel)
    private task: typeof TaskModel,
  ) {}

  async create(data: Partial<TaskModel>) {
    try {
      const createdTask = await this.task.create(data);

      return createdTask;
    } catch (error) {
      this.logger.error(`Failed to create task: ${error}`);
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async findAll() {
    try {
      const tasks = await this.task.findAll();

      return tasks;
    } catch (error) {
      this.logger.error(`Failed to find all tasks: ${error}`);
      throw new InternalServerErrorException('Failed to find all tasks');
    }
  }

  async findById(id: number) {
    try {
      const task = await this.task.findByPk(id);

      return task;
    } catch (error) {
      this.logger.error(`Failed to find task by id: ${error}`);
      throw new InternalServerErrorException('Failed to find task by id');
    }
  }

  async delete(id: number) {
    try {
      const task = await this.task.findByPk(id);
      if (!task) return null;

      await task.destroy();

      return task;
    } catch (error) {
      this.logger.error(`Failed to delete task: ${error}`);
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
