import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './repository/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(dto: CreateTaskDto) {
    const { title, description, category, status } = dto;

    const task = await this.taskRepository.create({
      title,
      description,
      category,
      status,
    });

    return task;
  }

  async findAll() {
    const tasks = await this.taskRepository.findAll();

    return tasks;
  }

  async findById(id: number) {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async delete(id: number) {
    const task = await this.taskRepository.delete(id);
    if (!task) throw new NotFoundException('Task not found');

    return null;
  }
}
