import express, { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { verifyToken } from '../middleware/auth';
import { OrderService } from '../services/orderService';
import { logger } from '../utils/logger';

const router = express.Router();

// Middleware for error handling
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Middleware for validation errors
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Order routes

// Create a new order
router.post(
  '/',
  verifyToken,
  body('startupId').isInt().withMessage('Startup ID must be an integer'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startupId, quantity } = req.body;
      const userId = req.user.id;
      const order = await OrderService.createOrder(userId, startupId, quantity);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

// Get order by ID
router.get(
  '/:orderId',
  verifyToken,
  param('orderId').isInt().withMessage('Order ID must be an integer'),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const userId = req.user.id;
      const order = await OrderService.getOrderById(userId, parseInt(orderId, 10));
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

// Update order
router.put(
  '/:orderId',
  verifyToken,
  param('orderId').isInt().withMessage('Order ID must be an integer'),
  body('quantity').optional().isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const userId = req.user.id;
      const updates = req.body;
      const order = await OrderService.updateOrder(userId, parseInt(orderId, 10), updates);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

// Delete order
router.delete(
  '/:orderId',
  verifyToken,
  param('orderId').isInt().withMessage('Order ID must be an integer'),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const userId = req.user.id;
      const success = await OrderService.deleteOrder(userId, parseInt(orderId, 10));
      if (!success) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

router.use(errorHandler);

export default router;
