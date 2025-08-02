import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import { config } from '../config/config';

interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  role: string;
}

const pool = new Pool({
  connectionString: config.DATABASE_URL,
});

export class AuthService {
  private static generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }

  public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        'INSERT INTO Users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, email, hashedPassword, 'user']
      );

      const user: User = result.rows[0];
      const token = AuthService.generateToken(user);

      res.status(201).json({ token });
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
      const user: User | undefined = result.rows[0];

      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const token = AuthService.generateToken(user);
      res.json({ token });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public static authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }
}
