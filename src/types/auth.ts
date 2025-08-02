/**
 * Authentication related types
 */

/**
 * Interface for authentication request
 */
export interface AuthRequest {
  username: string;
  password: string;
}

/**
 * Interface for authentication response
 */
export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Interface for JWT payload
 */
export interface JWTPayload {
  userId: number;
  role: UserRole;
  exp: number;
}