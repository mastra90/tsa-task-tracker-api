import { Injectable } from '@nestjs/common';
import { TaskType, taskEntity } from './types';

@Injectable()
export class TaskService {
  tasks: TaskType[] = [
    taskEntity({
      id: 1,
      title: 'Dummy task 1',
      description: 'Optional description for task 1',
      completed: false,
    }),
    taskEntity({
      id: 2,
      title: 'Dummy task 2',
      description: 'Optional description for task 2',
      completed: false,
    }),
    taskEntity({
      id: 3,
      title: 'Dummy task 3',
      description: '',
      completed: false,
    }),
  ];

  // Next available ID. Increments +1 for each newly created task
  private nextId = 4;

  getNextId() {
    return this.nextId++;
  }
}
