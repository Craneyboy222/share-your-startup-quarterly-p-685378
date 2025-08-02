import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class AnalyticsService {
  static async trackUserActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const activityData = req.body;
      // Assume a function saveUserActivity exists to store analytics
      await saveUserActivity(activityData);
      res.status(200).json({ message: 'Activity tracked successfully' });
    } catch (error) {
      logger.error('Error tracking user activity', error);
      next(error);
    }
  }

  static async getStartupAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const { startupId } = req.params;
      // Assume a function getAnalyticsData exists to fetch analytics
      const analyticsData = await getAnalyticsData(startupId);
      res.status(200).json(analyticsData);
    } catch (error) {
      logger.error('Error fetching startup analytics', error);
      next(error);
    }
  }
}
