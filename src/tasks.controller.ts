import { Controller, Get, Query } from '@nestjs/common';
import { TaskStorage } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskStorage: TaskStorage) {}

  @Get()
  async getAllTasks(@Query('completed') filterByCompleted?: string) {
    if (!filterByCompleted) {
      return this.taskStorage.tasks;
    }

    const isCompleted = filterByCompleted === 'true';
    return this.taskStorage.tasks.filter(
      (task) => task.completed === isCompleted,
    );
  }
}
