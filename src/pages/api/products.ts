import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // List all startups
      try {
        const { rows } = await pool.query('SELECT * FROM Startups');
        return res.status(200).json(rows);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    case 'POST':
      // Submit a new startup
      const { userId, name, url, location, stage, goals, discount } = req.body;
      if (!userId || !name || !url) {
        return res.status(400).json({ error: 'User ID, name, and URL are required' });
      }
      try {
        const { rows } = await pool.query('INSERT INTO Startups (user_id, name, url, location, stage, goals, discount, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING id', [userId, name, url, location, stage, goals, discount]);
        const startupId = rows[0].id;
        return res.status(201).json({ startupId });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}