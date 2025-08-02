import { Pool } from 'pg';
import { Notification } from '../models/Notification';
import { BaseRepository } from './BaseRepository';

export class NotificationRepository extends BaseRepository {
  constructor(db: Pool) {
    super(db);
  }

  async getNotificationsByUserId(userId: number): Promise<Notification[]> {
    const query = 'SELECT * FROM notifications WHERE user_id = $1';
    const result = await this.db.query(query, [userId]);
    return result.rows;
  }

  async createNotification(notification: Notification): Promise<number> {
    const query = `INSERT INTO notifications (user_id, type, content, is_read, created_at) 
                   VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    const values = [notification.user_id, notification.type, notification.content, notification.is_read, notification.created_at];
    const result = await this.db.query(query, values);
    return result.rows[0].id;
  }

  async markAsRead(notificationId: number): Promise<void> {
    const query = 'UPDATE notifications SET is_read = true WHERE id = $1';
    await this.db.query(query, [notificationId]);
  }
}