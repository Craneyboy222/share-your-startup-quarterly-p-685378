import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import { validationResult } from 'express-validator';
import { body, param } from 'express-validator';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

const pool = new Pool();

// Middleware for product authentication
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (ex) {
    logger.error('Invalid token');
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Middleware for product authorization
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied.' });
    }
    next();
  };
};

// Get all startups
export const getStartups = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM Startups');
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching startups', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Validate startup submission
export const validateStartupSubmission = [
  body('name').notEmpty().withMessage('Name is required'),
  body('url').isURL().withMessage('Valid URL is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('stage').notEmpty().withMessage('Stage is required'),
];

// Submit a new startup
export const submitStartup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, url, location, stage, goals, discount } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Startups (user_id, name, url, location, stage, goals, discount, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [req.user.id, name, url, location, stage, goals, discount, new Date()]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Error submitting startup', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Validate startup ID
export const validateStartupId = [
  param('id').isInt().withMessage('Startup ID must be an integer')
];

// Get startup details
export const getStartupDetails = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Startups WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Startup not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Error fetching startup details', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
