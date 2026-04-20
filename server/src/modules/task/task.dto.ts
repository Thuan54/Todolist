// Priority type constraint
export type Priority = 'green' | 'yellow' | 'red';

// Subtask type (one-level only, no nested subtasks)
export interface SubtaskDto {
  title: string;
  description?: string;
  dueDate?: Date | string;
  priority?: Priority;
  isCompleted?: boolean;
}

// DTO for creating a new task
export interface CreateTaskDto {
  title: string;
  description?: string;
  dueDate?: Date | string;
  priority?: Priority;
  isCompleted?: boolean;
  subtasks?: SubtaskDto[];
}

// DTO for updating a task (all fields optional)
export type UpdateTaskDto = Partial<CreateTaskDto>;

// DTO for task response (includes system-generated fields)
export interface TaskResponseDto {
  _id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  isCompleted: boolean;
  subtasks: (Omit<SubtaskDto, 'subtasks'> & { _id?: string })[];
  createdAt: Date;
  updatedAt?: Date;
}