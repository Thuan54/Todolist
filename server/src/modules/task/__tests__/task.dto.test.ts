// Type compilation tests for DTOs
// Ensures DTOs match the CONTEXT.md schema

import { CreateTaskDto, UpdateTaskDto, TaskResponseDto, Priority } from '../task.dto';

describe('Task DTO Types', () => {
  test('Priority type accepts only green, yellow, red', () => {
    // This test verifies type safety at compile time
    const valid: Priority = 'green';
    // @ts-expect-error - Invalid priority should fail compilation
    const invalid: Priority = 'blue';
  });

  test('CreateTaskDto requires title', () => {
    // Type-level test: this should not compile if title is missing
    const task: CreateTaskDto = {
      title: 'Test Task',
      // description, dueDate, etc. are optional
    };
  });

  test('Subtasks are one-level only', () => {
    const task: CreateTaskDto = {
      title: 'Parent',
      subtasks: [
        {
          title: 'Child',
          // subtasks property should not exist on SubtaskDto
          // @ts-expect-error - Nested subtasks not supported
          subtasks: [],
        },
      ],
    };
  });
});