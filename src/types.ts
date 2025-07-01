export type TaskType = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

export const taskEntity = (task: TaskType): TaskType => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
  };
};
