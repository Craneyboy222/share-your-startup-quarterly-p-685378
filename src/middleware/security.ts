import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';
import { auditLog } from '../services/audit';

export const securityMiddleware = [
    helmet(),
    (req: Request, res: Response, next: NextFunction) => {
        auditLog(req);
        next();
    }
];