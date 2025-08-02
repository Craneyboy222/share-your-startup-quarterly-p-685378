import { Request, Response, NextFunction } from 'express';
import { validationResult, checkSchema } from 'express-validator';

export const validate = (schema: any) => [
  checkSchema(schema),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];