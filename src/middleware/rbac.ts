import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/errors';

export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(new ForbiddenError('Access denied'));
        }
        next();
    };
};