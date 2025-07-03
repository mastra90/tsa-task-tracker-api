import { TaskService } from './tasks.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService();
  });

  it('should start with 3 tasks', () => {
    expect(service.tasks.length).toBe(3);
  });

  it('should generate next id', () => {
    expect(service.getNextId()).toBe(4);
  });
});
