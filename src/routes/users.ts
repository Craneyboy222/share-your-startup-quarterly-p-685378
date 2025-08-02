import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import { logError } from '../middleware/logging';

const router = express.Router();
const pool = new Pool();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register a new user
router.post('/register',
  body('username').isLength({ min: 5 }),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);

      const { rows } = await pool.query(
        'INSERT INTO Users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id',
        [username, email, passwordHash, 'user']
      );

      res.status(201).json({ userId: rows[0].id });
    } catch (err) {
      logError(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Login a user
router.post('/login',
  body('email').isEmail(),
  body('password').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const { rows } = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);

      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      logError(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, username, email, role FROM Users WHERE id = $1', [req.user.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update user profile
router.put('/profile',
  authenticateToken,
  body('username').optional().isLength({ min: 5 }),
  body('email').optional().isEmail(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email } = req.body;
      const updates = [];
      if (username) updates.push(pool.query('UPDATE Users SET username = $1 WHERE id = $2', [username, req.user.userId]));
      if (email) updates.push(pool.query('UPDATE Users SET email = $1 WHERE id = $2', [email, req.user.userId]));

      await Promise.all(updates);

      res.status(204).send();
    } catch (err) {
      logError(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Admin: Get all users
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, username, email, role FROM Users');
    res.json(rows);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
