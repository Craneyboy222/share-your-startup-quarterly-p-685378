export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  role: string;
}

export interface Startup {
  id: number;
  userId: number;
  name: string;
  url: string;
  location: string;
  stage: string;
  goals: string;
  discount: string;
  createdAt: Date;
}

export interface Comment {
  id: number;
  userId: number;
  startupId: number;
  content: string;
  createdAt: Date;
}

export interface Vote {
  id: number;
  userId: number;
  startupId: number;
  voteType: string;
}

export interface Notification {
  id: number;
  userId: number;
  type: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Discount {
  id: number;
  startupId: number;
  code: string;
  description: string;
  expiryDate: Date;
}