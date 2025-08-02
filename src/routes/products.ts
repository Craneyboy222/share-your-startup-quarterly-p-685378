import express, { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { authenticateUser, authorizeAdmin } from '../middleware/auth';
import { 
  getAllStartups, 
  submitNewStartup,
  getStartupDetails,
  addCommentToStartup,
  listStartupComments,
  voteOnStartup,
  approveStartup
} from '../controllers/startupController';
import { logError } from '../middleware/logger';

const router = express.Router();

// Middleware for validation error handling
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Route to list all startups
router.get('/api/startups', authenticateUser, async (req: Request, res: Response) => {
  try {
    const startups = await getAllStartups();
    res.status(200).json(startups);
  } catch (error) {
    logError(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to submit a new startup
router.post('/api/startups', 
  authenticateUser,
  body('name').isString().notEmpty(),
  body('url').isURL(),
  body('location').isString().notEmpty(),
  body('stage').isString().notEmpty(),
  body('goals').isString().notEmpty(),
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { name, url, location, stage, goals } = req.body;
      const newStartup = await submitNewStartup(req.user.id, { name, url, location, stage, goals });
      res.status(201).json(newStartup);
    } catch (error) {
      logError(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// Route to get startup details
router.get('/api/startups/:id', 
  authenticateUser,
  param('id').isInt(),
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const startup = await getStartupDetails(parseInt(req.params.id, 10));
      if (!startup) {
        return res.status(404).json({ message: 'Startup not found' });
      }
      res.status(200).json(startup);
    } catch (error) {
      logError(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// Route to add a comment to a startup
router.post('/api/startups/:id/comments',
  authenticateUser,
  param('id').isInt(),
  body('content').isString().notEmpty(),
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { content } = req.body;
      const comment = await addCommentToStartup(req.user.id, parseInt(req.params.id, 10), content);
      res.status(201).json(comment);
    } catch (error) {
      logError(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// Route to list comments for a startup
router.get('/api/startups/:id/comments',
  authenticateUser,
  param('id').isInt(),
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const comments = await listStartupComments(parseInt(req.params.id, 10));
      res.status(200).json(comments);
    } catch (error) {
      logError(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// Route to upvote or downvote a startup
router.post('/api/startups/:id/vote',
  authenticateUser,
  param('id').isInt(),
  body('voteType').isIn(['upvote', 'downvote']),
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { voteType } = req.body;
      const vote = await voteOnStartup(req.user.id, parseInt(req.params.id, 10), voteType);
      res.status(200).json(vote);
    } catch (error) {
      logError(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// Admin route to approve a startup submission
router.post('/api/admin/startups/:id/approve',
  authenticateUser,
  authorizeAdmin,
  param('id').isInt(),
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      await approveStartup(parseInt(req.params.id, 10));
      res.status(200).json({ message: 'Startup approved' });
    } catch (error) {
      logError(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

export default router;
