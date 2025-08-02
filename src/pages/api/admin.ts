import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // Approve startup submission
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Startup ID is required' });
      }
      try {
        await pool.query('UPDATE Startups SET approved = true WHERE id = $1', [id]);
        return res.status(200).json({ message: 'Startup approved' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}