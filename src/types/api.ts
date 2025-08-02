/**
 * API related types
 */

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/**
 * Startup submission request payload
 */
export interface StartupSubmission {
  name: string;
  url: string;
  location: string;
  stage: string;
  goals: string;
  discount?: number;
}

/**
 * Vote request payload
 */
export interface VoteRequest {
  startupId: number;
  voteType: 'upvote' | 'downvote';
}