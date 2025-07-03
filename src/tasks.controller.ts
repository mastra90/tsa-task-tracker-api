import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskType, UpdateTaskType, taskEntity } from './types';
import { TaskService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskStorage: TaskService) {}

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

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskId = parseInt(id);
    const task = this.taskStorage.tasks.find((t) => t.id === taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} does not exist.`);
    }
    return task;
  }

  @Post()
  async createTask(@Body() taskData: CreateTaskType) {
    const newTask = taskEntity({
      id: this.taskStorage.getNextId(),
      title: taskData.title,
      description: taskData.description || '',
      completed: false,
    });

    this.taskStorage.tasks.push(newTask);
    return newTask;
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() taskData: UpdateTaskType) {
    const taskId = parseInt(id);
    const taskIndex = this.taskStorage.tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    const updatedTask = taskEntity({
      ...this.taskStorage.tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString(),
    });

    this.taskStorage.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    const taskId = parseInt(id);
    const taskIndex = this.taskStorage.tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    const taskToDelete = this.taskStorage.tasks[taskIndex];
    this.taskStorage.tasks.splice(taskIndex, 1);

    return { message: `${taskToDelete.title} has been deleted.` };
  }
}
