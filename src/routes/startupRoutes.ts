import express from 'express';

const router = express.Router();

// Example route for fetching startups
router.get('/startups', (req, res) => {
  res.json({ message: 'List of startups' });
});

// Example route for creating a startup
router.post('/startups', (req, res) => {
  res.json({ message: 'Startup created' });
});

export default router;
