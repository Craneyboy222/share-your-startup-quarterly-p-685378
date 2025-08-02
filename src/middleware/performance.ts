/* Performance middleware */
import { Request, Response, NextFunction } from 'express';
import { getCache, setCache } from '../services/cache';

export const cacheMiddleware = (ttl: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl;
    const cachedResponse = await getCache(key);
    if (cachedResponse) {
      res.send(JSON.parse(cachedResponse));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        setCache(key, JSON.stringify(body), ttl);
        res.sendResponse(body);
      };
      next();
    }
  };
};

export const dbQueryOptimization = () => {
  // Implement database query optimization logic here
};

export const responseTimeLogger = (req: Request, res: Response, next: NextFunction) => {
  const startHrTime = process.hrtime();
  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    console.log(`Request to ${req.path} took ${elapsedTimeInMs} ms`);
  });
  next();
};