import { Priority, CreateTaskDto, SubtaskDto } from '../modules/task/task.dto';

const VALID_PRIORITIES: Priority[] = ['green', 'yellow', 'red'];

export class ValidationError extends Error {
  constructor(
    public field: string,
    public message: string,
    public code: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validatePriority(value: unknown): Priority {
  if (typeof value !== 'string' || !VALID_PRIORITIES.includes(value as Priority)) {
    throw new ValidationError(
      'priority',
      `Priority must be one of: ${VALID_PRIORITIES.join(', ')}`,
      'INVALID_PRIORITY'
    );
  }
  return value as Priority;
}

export function validateDate(value: unknown): Date | undefined {
  if (value === undefined || value === null) return undefined;
  
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value;
  }
  
  if (typeof value === 'string') {
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  
  throw new ValidationError(
    'dueDate',
    'dueDate must be a valid ISO date string or Date object',
    'INVALID_DATE'
  );
}

export function validateRequiredString(
  value: unknown,
  fieldName: string,
  maxLength?: number
): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new ValidationError(
      fieldName,
      `${fieldName} is required and must be a non-empty string`,
      'REQUIRED_STRING'
    );
  }
  
  const trimmed = value.trim();
  if (maxLength && trimmed.length > maxLength) {
    throw new ValidationError(
      fieldName,
      `${fieldName} must not exceed ${maxLength} characters`,
      'STRING_TOO_LONG'
    );
  }
  
  return trimmed;
}

export function validateSubtask(subtask: unknown): SubtaskDto {
  if (typeof subtask !== 'object' || subtask === null) {
    throw new ValidationError(
      'subtask',
      'Subtask must be an object',
      'INVALID_SUBTASK_TYPE'
    );
  }
  
  const st = subtask as Record<string, unknown>;
  const result: SubtaskDto = {
    title: validateRequiredString(st.title, 'subtask.title'),
  };
  
  if (st.description !== undefined) {
    result.description = validateRequiredString(st.description, 'subtask.description', 500);
  }
  
  if (st.dueDate !== undefined) {
    result.dueDate = validateDate(st.dueDate);
  }
  
  if (st.priority !== undefined) {
    result.priority = validatePriority(st.priority);
  }
  
  if (st.isCompleted !== undefined) {
    if (typeof st.isCompleted !== 'boolean') {
      throw new ValidationError(
        'subtask.isCompleted',
        'isCompleted must be a boolean',
        'INVALID_BOOLEAN'
      );
    }
    result.isCompleted = st.isCompleted;
  }
  
  return result;
}

export function validateCreateTaskDto(input: unknown): CreateTaskDto {
  if (typeof input !== 'object' || input === null) {
    throw new ValidationError(
      'root',
      'Task data must be an object',
      'INVALID_INPUT_TYPE'
    );
  }
  
  const data = input as Record<string, unknown>;
  const result: CreateTaskDto = {
    title: validateRequiredString(data.title, 'title', 200),
  };
  
  if (data.description !== undefined) {
    result.description = validateRequiredString(data.description, 'description', 1000);
  }
  
  if (data.dueDate !== undefined) {
    result.dueDate = validateDate(data.dueDate);
  }
  
  if (data.priority !== undefined) {
    result.priority = validatePriority(data.priority);
  } else {
    result.priority = 'green'; // Default priority
  }
  
  if (data.isCompleted !== undefined) {
    if (typeof data.isCompleted !== 'boolean') {
      throw new ValidationError(
        'isCompleted',
        'isCompleted must be a boolean',
        'INVALID_BOOLEAN'
      );
    }
    result.isCompleted = data.isCompleted;
  } else {
    result.isCompleted = false; // Default to not completed
  }
  
  if (data.subtasks !== undefined) {
    if (!Array.isArray(data.subtasks)) {
      throw new ValidationError(
        'subtasks',
        'subtasks must be an array',
        'INVALID_SUBTASKS_TYPE'
      );
    }
    result.subtasks = data.subtasks.map(validateSubtask);
  }
  
  return result;
}

export function validateUpdateTaskDto(input: unknown): Partial<CreateTaskDto> {
  if (typeof input !== 'object' || input === null) {
    throw new ValidationError(
      'root',
      'Update data must be an object',
      'INVALID_INPUT_TYPE'
    );
  }
  
  const data = input as Record<string, unknown>;
  const result: Partial<CreateTaskDto> = {};
  
  if (data.title !== undefined) {
    result.title = validateRequiredString(data.title, 'title', 200);
  }
  
  if (data.description !== undefined) {
    result.description = validateRequiredString(data.description, 'description', 1000);
  }
  
  if (data.dueDate !== undefined) {
    result.dueDate = validateDate(data.dueDate);
  }
  
  if (data.priority !== undefined) {
    result.priority = validatePriority(data.priority);
  }
  
  if (data.isCompleted !== undefined) {
    if (typeof data.isCompleted !== 'boolean') {
      throw new ValidationError(
        'isCompleted',
        'isCompleted must be a boolean',
        'INVALID_BOOLEAN'
      );
    }
    result.isCompleted = data.isCompleted;
  }
  
  if (data.subtasks !== undefined) {
    if (!Array.isArray(data.subtasks)) {
      throw new ValidationError(
        'subtasks',
        'subtasks must be an array',
        'INVALID_SUBTASKS_TYPE'
      );
    }
    result.subtasks = data.subtasks.map(validateSubtask);
  }
  
  return result;
}