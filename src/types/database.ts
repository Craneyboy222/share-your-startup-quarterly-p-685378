/**
 * Database related types
 */

/**
 * Interface for Startups table
 */
export interface Startup {
  id: number;
  userId: number;
  name: string;
  url: string;
  location: string;
  stage: string;
  goals: string;
  discount?: number;
  createdAt: Date;
}

/**
 * Interface for Comments table
 */
export interface Comment {
  id: number;
  userId: number;
  startupId: number;
  content: string;
  createdAt: Date;
}

/**
 * Interface for Votes table
 */
export interface Vote {
  id: number;
  userId: number;
  startupId: number;
  voteType: 'upvote' | 'downvote';
}

/**
 * Interface for Notifications table
 */
export interface Notification {
  id: number;
  userId: number;
  type: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

/**
 * Interface for Discounts table
 */
export interface Discount {
  id: number;
  startupId: number;
  code: string;
  description: string;
  expiryDate: Date;
}