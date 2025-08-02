/**
 * User related types
 */

/**
 * Enum for user roles
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

/**
 * Interface for user data
 */
export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

/**
 * Interface for user profile
 */
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  submittedStartups: Startup[];
}