import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Startup } from '../models/startup';
import { errorHandler, logger } from '../utils';

export const searchStartups = async (req: Request, res: Response) => {
  try {
    const { query, filter } = req.query;
    const startups = await Startup.findAll({
      where: {
        name: { $like: `%${query}%` },
        stage: filter.stage,
        location: filter.location
      }
    });
    res.status(200).json(startups);
  } catch (error) {
    logger.error('Error searching startups', error);
    errorHandler(res, error);
  }
};
