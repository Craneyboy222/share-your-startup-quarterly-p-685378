import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// List all startups
router.get('/', (req, res) => {
  // Fetch startups logic
  res.status(200).json({ startups: 'list of startups' });
});

// Submit a new startup
router.post('/', [
  body('name').isString(),
  body('url').isURL(),
  body('location').isString(),
  body('stage').isString(),
  body('goals').isString()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Submit startup logic
  res.status(201).send('Startup submitted');
});

// Get startup details
router.get('/:id', (req, res) => {
  // Fetch startup details logic
  res.status(200).json({ startup: 'startup details' });
});

export default router;