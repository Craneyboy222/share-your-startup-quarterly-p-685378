/**
 * Validation related types
 */

/**
 * Interface for validation errors
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Interface for validating a request
 */
export interface Validator<T> {
  validate(input: T): ValidationError[];
}