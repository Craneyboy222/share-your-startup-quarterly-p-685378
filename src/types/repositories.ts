import { User, Startup, Comment, Vote, Notification, Discount } from './models';

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
}

export interface StartupRepository {
  findById(id: number): Promise<Startup | null>;
  findAll(): Promise<Startup[]>;
  create(startup: Startup): Promise<Startup>;
}

export interface CommentRepository {
  findById(id: number): Promise<Comment | null>;
  findByStartupId(startupId: number): Promise<Comment[]>;
  create(comment: Comment): Promise<Comment>;
}

export interface VoteRepository {
  findByUserAndStartup(userId: number, startupId: number): Promise<Vote | null>;
  create(vote: Vote): Promise<Vote>;
}

export interface NotificationRepository {
  findById(id: number): Promise<Notification | null>;
  findByUserId(userId: number): Promise<Notification[]>;
  create(notification: Notification): Promise<Notification>;
}

export interface DiscountRepository {
  findByCode(code: string): Promise<Discount | null>;
  create(discount: Discount): Promise<Discount>;
}