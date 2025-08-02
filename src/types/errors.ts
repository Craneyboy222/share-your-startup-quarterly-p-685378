/**
 * Error handling types
 */

/**
 * Application error structure
 */
export interface AppError {
  code: string;
  message: string;
  details?: string;
}

/**
 * Error response from the API
 */
export interface ErrorResponse {
  error: AppError;
}