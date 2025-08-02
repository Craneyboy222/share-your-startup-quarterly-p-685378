import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // Mark notification as read
      const { id } = req.query;
      const { userId } = req.body;
      if (!id || !userId) {
        return res.status(400).json({ error: 'Notification ID and User ID are required' });
      }
      try {
        await pool.query('UPDATE Notifications SET is_read = true WHERE id = $1 AND user_id = $2', [id, userId]);
        return res.status(200).json({ message: 'Notification marked as read' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}