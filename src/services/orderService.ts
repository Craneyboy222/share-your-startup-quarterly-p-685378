import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// TypeScript types
interface Order {
  id: number;
  user_id: number;
  startup_id: number;
  discount_code?: string;
  status: string;
  created_at: Date;
}

// Middleware for order authentication
const authenticateOrder = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Error handling middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
};

// Order service
class OrderService {
  // Create a new order
  async createOrder(req: Request, res: Response) {
    try {
      const { startup_id, discount_code } = req.body;
      const user_id = req.user.id;

      // Validate request
      if (!startup_id) {
        return res.status(400).json({ error: 'Startup ID is required' });
      }

      // Perform business logic
      const result = await pool.query(
        'INSERT INTO Orders (user_id, startup_id, discount_code, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
        [user_id, startup_id, discount_code, 'pending']
      );

      const order: Order = result.rows[0];
      res.status(201).json(order);
    } catch (err) {
      errorHandler(err, req, res, () => {});
    }
  }

  // Get orders for a user
  async getUserOrders(req: Request, res: Response) {
    try {
      const user_id = req.user.id;
      const result = await pool.query('SELECT * FROM Orders WHERE user_id = $1', [user_id]);
      res.status(200).json(result.rows);
    } catch (err) {
      errorHandler(err, req, res, () => {});
    }
  }

  // Update order status
  async updateOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate request
      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      const result = await pool.query(
        'UPDATE Orders SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const order: Order = result.rows[0];
      res.status(200).json(order);
    } catch (err) {
      errorHandler(err, req, res, () => {});
    }
  }
}

// Export instance of OrderService
export default new OrderService();
