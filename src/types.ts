import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export type TaskType = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

export class CreateTaskType {
  @IsNotEmpty({ message: 'Title is required' })
  @Transform(({ value }) => value?.trim())
  @MaxLength(50, { message: 'Title must be less than 50 characters' })
  title: string;

  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @MaxLength(100, { message: 'Description must be less than 100 characters' })
  description?: string;
}

export class UpdateTaskType {
  @IsNotEmpty({ message: 'Title is required' })
  @Transform(({ value }) => value?.trim())
  @MaxLength(50, { message: 'Title must be less than 50 characters' })
  title?: string;

  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @MaxLength(100, { message: 'Description must be less than 100 characters' })
  description?: string;

  @IsOptional()
  completed?: boolean;
}

export const taskEntity = (task: TaskType) => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
  };
};
