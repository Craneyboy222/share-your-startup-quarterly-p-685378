import { Pool } from 'pg';

const pool = new Pool();

export class NotificationService {
  async listUserNotifications(userId: number): Promise<any[]> {
    try {
      const result = await pool.query('SELECT * FROM Notifications WHERE user_id = $1', [userId]);
      return result.rows;
    } catch (error) {
      console.error('Error listing notifications:', error);
      throw new Error('Failed to list notifications');
    }
  }

  async markNotificationAsRead(notificationId: number): Promise<void> {
    try {
      await pool.query('UPDATE Notifications SET is_read = true WHERE id = $1', [notificationId]);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw new Error('Failed to mark notification as read');
    }
  }
}
