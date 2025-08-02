import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { pool } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // User registration
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
      }
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { rows } = await pool.query('INSERT INTO Users (username, email, password_hash, role) VALUES ($1, $2, $3, 'user') RETURNING id', [username, email, hashedPassword]);
        const userId = rows[0].id;
        return res.status(201).json({ userId });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}