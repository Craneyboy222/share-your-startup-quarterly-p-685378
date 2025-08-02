import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Discount } from '../models/discount';
import { errorHandler, logger } from '../utils';

export const listDiscounts = async (req: Request, res: Response) => {
  try {
    const discounts = await Discount.findAll();
    res.status(200).json(discounts);
  } catch (error) {
    logger.error('Error fetching discounts', error);
    errorHandler(res, error);
  }
};

export const createDiscount = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { startupId, code, description, expiryDate } = req.body;
  try {
    const discount = await Discount.create({ startupId, code, description, expiryDate });
    res.status(201).json(discount);
  } catch (error) {
    logger.error('Error creating discount', error);
    errorHandler(res, error);
  }
};
