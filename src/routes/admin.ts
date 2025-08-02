import express from 'express';
import { body, param } from 'express-validator';
import { authenticateAdmin } from '../middleware/auth';
import { validateRequest } from '../middleware/validate-request';
import { approveStartup, listPendingStartups, manageDiscountCodes } from '../controllers/admin';

const router = express.Router();

// Middleware to authenticate and authorize admin users
router.use(authenticateAdmin);

// Route to list all pending startups for approval
router.get('/startups/pending', 
  async (req, res) => {
    try {
      const startups = await listPendingStartups();
      res.status(200).json(startups);
    } catch (error) {
      console.error('Error listing pending startups:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Route to approve a specific startup submission
router.post('/startups/:id/approve',
  param('id').isInt().withMessage('Startup ID must be an integer'),
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      await approveStartup(Number(id));
      res.status(200).json({ message: 'Startup approved successfully' });
    } catch (error) {
      console.error('Error approving startup:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Route to manage discount codes
router.post('/discounts/manage',
  body('startupId').isInt().withMessage('Startup ID must be an integer'),
  body('code').isString().isLength({ min: 1 }).withMessage('Code must not be empty'),
  body('description').isString().optional(),
  body('expiryDate').isISO8601().withMessage('Expiry date must be a valid date'),
  validateRequest,
  async (req, res) => {
    try {
      const { startupId, code, description, expiryDate } = req.body;
      await manageDiscountCodes(startupId, code, description, expiryDate);
      res.status(200).json({ message: 'Discount code managed successfully' });
    } catch (error) {
      console.error('Error managing discount codes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

export { router as adminRouter };