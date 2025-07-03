import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TaskService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should get all tasks', async () => {
    const result = await controller.getAllTasks();
    expect(result).toBeDefined();
    expect(result.length).toBe(3);
  });

  it('should create a new task', async () => {
    const newTask = await controller.createTask({
      title: 'Test Task',
    });

    expect(newTask.title).toBe('Test Task');
    expect(newTask.completed).toBe(false);
  });

  it('should get a task by id', async () => {
    const task = await controller.getTaskById('1');
    expect(task.id).toBe(1);
    expect(task.title).toBe('Dummy task 1');
  });
});
