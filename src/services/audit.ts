import { Request } from 'express';
import { writeLog } from '../utils/logger';

export const auditLog = (req: Request) => {
    const log = {
        user: req.user?.id || 'Anonymous',
        method: req.method,
        path: req.path,
        timestamp: new Date().toISOString()
    };
    writeLog('audit', log);
};