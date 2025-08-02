import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import { logger } from '../utils/logger';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const router = express.Router();
const pool = new Pool();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const SALT_ROUNDS = 10;

// Middleware to authenticate JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

// POST /api/auth/register
router.post(
  '/register',
  [
    body('username').isString().isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 6 })
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      const client = await pool.connect();

      const userExists = await client.query('SELECT * FROM Users WHERE email = $1', [email]);
      if (userExists.rowCount > 0) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

      const result = await client.query(
        'INSERT INTO Users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id',
        [username, email, passwordHash, 'user']
      );

      const userId = result.rows[0].id;
      const token = jwt.sign({ userId, email, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token });
    } catch (err) {
      logger.error('Error registering user', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').isString()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const client = await pool.connect();

      const result = await client.query('SELECT * FROM Users WHERE email = $1', [email]);
      if (result.rowCount === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    } catch (err) {
      logger.error('Error logging in', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Middleware to ensure user is authenticated
router.use(authenticateToken);

// GET /api/auth/profile
router.get('/profile', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, username, email, role FROM Users WHERE id = $1', [req.user.userId]);
    res.json(result.rows[0]);
  } catch (err) {
    logger.error('Error fetching profile', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
