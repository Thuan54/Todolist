import { 
  validatePriority, 
  validateDate, 
  validateRequiredString, 
  validateSubtask, 
  validateCreateTaskDto, 
  validateUpdateTaskDto,
  ValidationError 
} from '../validation';

describe('Validation Utilities', () => {
  describe('validatePriority', () => {
    it('accepts valid priorities', () => {
      expect(validatePriority('green')).toBe('green');
      expect(validatePriority('yellow')).toBe('yellow');
      expect(validatePriority('red')).toBe('red');
    });

    it('throws ValidationError for invalid priority', () => {
      expect(() => validatePriority('blue')).toThrow(ValidationError);
      expect(() => validatePriority('blue')).toThrow('INVALID_PRIORITY');
      expect(() => validatePriority(123)).toThrow(ValidationError);
    });
  });

  describe('validateDate', () => {
    it('returns Date instance for valid ISO string', () => {
      const result = validateDate('2026-04-20T10:00:00Z');
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2026);
    });

    it('returns Date instance for Date object', () => {
      const d = new Date();
      expect(validateDate(d)).toBe(d);
    });

    it('returns undefined for null/undefined', () => {
      expect(validateDate(undefined)).toBeUndefined();
      expect(validateDate(null)).toBeUndefined();
    });

    it('throws for invalid date string', () => {
      expect(() => validateDate('not-a-date')).toThrow(ValidationError);
      expect(() => validateDate('not-a-date')).toThrow('INVALID_DATE');
    });
  });

  describe('validateRequiredString', () => {
    it('trims and returns valid string', () => {
      expect(validateRequiredString('  hello  ', 'test')).toBe('hello');
    });

    it('throws for empty or whitespace-only string', () => {
      expect(() => validateRequiredString('', 'test')).toThrow(ValidationError);
      expect(() => validateRequiredString('   ', 'test')).toThrow(ValidationError);
      expect(() => validateRequiredString('', 'test')).toThrow('REQUIRED_STRING');
    });

    it('throws for non-string types', () => {
      expect(() => validateRequiredString(123, 'test')).toThrow(ValidationError);
      expect(() => validateRequiredString(null, 'test')).toThrow(ValidationError);
    });

    it('enforces max length constraint', () => {
      const long = 'a'.repeat(201);
      expect(() => validateRequiredString(long, 'test', 200)).toThrow('STRING_TOO_LONG');
    });
  });

  describe('validateSubtask', () => {
    it('validates minimal subtask with required title', () => {
      const result = validateSubtask({ title: 'Child Task' });
      expect(result.title).toBe('Child Task');
      expect(result.description).toBeUndefined();
    });

    it('throws if subtask is not an object', () => {
      expect(() => validateSubtask('string')).toThrow(ValidationError);
      expect(() => validateSubtask('string')).toThrow('INVALID_SUBTASK_TYPE');
    });

    it('throws if subtask title is missing', () => {
      expect(() => validateSubtask({})).toThrow(ValidationError);
    });
  });

  describe('validateCreateTaskDto', () => {
    it('creates valid task with defaults', () => {
      const input = { title: 'Test Task' };
      const result = validateCreateTaskDto(input);
      expect(result.title).toBe('Test Task');
      expect(result.priority).toBe('green');
      expect(result.isCompleted).toBe(false);
      expect(result.subtasks).toBeUndefined();
    });

    it('accepts all optional fields and validates subtasks array', () => {
      const input = {
        title: 'Full Task',
        description: 'Desc',
        dueDate: '2026-05-01',
        priority: 'red',
        isCompleted: true,
        subtasks: [{ title: 'Sub 1' }, { title: 'Sub 2' }]
      };
      const result = validateCreateTaskDto(input);
      expect(result.description).toBe('Desc');
      expect(result.priority).toBe('red');
      expect(result.isCompleted).toBe(true);
      expect(result.subtasks).toHaveLength(2);
    });

    it('throws when title is missing', () => {
      expect(() => validateCreateTaskDto({})).toThrow('REQUIRED_STRING');
    });

    it('throws for non-object input', () => {
      expect(() => validateCreateTaskDto(null)).toThrow('INVALID_INPUT_TYPE');
      expect(() => validateCreateTaskDto('string')).toThrow('INVALID_INPUT_TYPE');
    });

    it('throws for invalid subtasks type', () => {
      const input = { title: 'Test', subtasks: 'not-array' };
      expect(() => validateCreateTaskDto(input)).toThrow('INVALID_SUBTASKS_TYPE');
    });
  });

  describe('validateUpdateTaskDto', () => {
    it('allows partial updates without throwing', () => {
      const result = validateUpdateTaskDto({ priority: 'yellow' });
      expect(result.priority).toBe('yellow');
      expect(result.title).toBeUndefined();
    });

    it('throws for invalid input types', () => {
      expect(() => validateUpdateTaskDto([])).toThrow('INVALID_INPUT_TYPE');
      expect(() => validateUpdateTaskDto('string')).toThrow('INVALID_INPUT_TYPE');
    });

    it('validates fields when provided', () => {
      expect(() => validateUpdateTaskDto({ title: '' })).toThrow('REQUIRED_STRING');
      expect(() => validateUpdateTaskDto({ priority: 'purple' })).toThrow('INVALID_PRIORITY');
    });
  });
});