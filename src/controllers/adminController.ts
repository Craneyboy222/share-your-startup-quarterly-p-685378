import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Startup } from '../models/startup';
import { errorHandler, logger } from '../utils';

export const approveStartup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const startup = await Startup.findByPk(id);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    await startup.update({ approved: true });
    res.status(200).json(startup);
  } catch (error) {
    logger.error('Error approving startup', error);
    errorHandler(res, error);
  }
};
