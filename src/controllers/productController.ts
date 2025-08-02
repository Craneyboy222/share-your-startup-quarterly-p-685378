import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Startup } from '../models/startup';
import { errorHandler, logger } from '../utils';

export const listStartups = async (req: Request, res: Response) => {
  try {
    const startups = await Startup.findAll();
    res.status(200).json(startups);
  } catch (error) {
    logger.error('Error fetching startups', error);
    errorHandler(res, error);
  }
};

export const createStartup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, url, location, stage, goals, discount } = req.body;
  try {
    const startup = await Startup.create({ userId: req.user.id, name, url, location, stage, goals, discount });
    res.status(201).json(startup);
  } catch (error) {
    logger.error('Error creating startup', error);
    errorHandler(res, error);
  }
};

export const getStartupDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const startup = await Startup.findByPk(id);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    res.status(200).json(startup);
  } catch (error) {
    logger.error('Error fetching startup details', error);
    errorHandler(res, error);
  }
};
