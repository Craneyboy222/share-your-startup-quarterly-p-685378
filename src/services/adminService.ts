import { Request, Response, NextFunction } from 'express';
import { Users, Startups } from '../models';
import { logger } from '../utils/logger';

export class AdminService {
  static async approveStartup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const startup = await Startups.findByPk(id);

      if (!startup) {
        return res.status(404).json({ message: 'Startup not found' });
      }

      startup.approved = true;
      await startup.save();

      res.status(200).json({ message: 'Startup approved successfully' });
    } catch (error) {
      logger.error('Error approving startup', error);
      next(error);
    }
  }

  static async listPendingStartups(req: Request, res: Response, next: NextFunction) {
    try {
      const pendingStartups = await Startups.findAll({ where: { approved: false } });
      res.status(200).json(pendingStartups);
    } catch (error) {
      logger.error('Error listing pending startups', error);
      next(error);
    }
  }

  static async manageUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, role } = req.body;
      const user = await Users.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.role = role;
      await user.save();

      res.status(200).json({ message: 'User role updated successfully' });
    } catch (error) {
      logger.error('Error updating user role', error);
      next(error);
    }
  }
}
