import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../models/user';
import { Notification } from '../models/notification';
import { errorHandler, logger } from '../utils';

export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.findAll({ where: { userId } });
    res.status(200).json(notifications);
  } catch (error) {
    logger.error('Error fetching user notifications', error);
    errorHandler(res, error);
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    await notification.update({ isRead: true });
    res.status(200).json(notification);
  } catch (error) {
    logger.error('Error marking notification as read', error);
    errorHandler(res, error);
  }
};
