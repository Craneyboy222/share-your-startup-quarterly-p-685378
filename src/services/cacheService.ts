import redis from 'redis';
import { logger } from '../utils/logger';

const client = redis.createClient();

client.on('error', (err) => {
  logger.error('Redis Client Error', err);
});

export class CacheService {
  static async setCache(key: string, value: any, expiration: number = 3600) {
    try {
      client.setex(key, expiration, JSON.stringify(value));
    } catch (error) {
      logger.error('Error setting cache', error);
    }
  }

  static async getCache(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) {
          logger.error('Error getting cache', err);
          return reject(err);
        }
        resolve(data ? JSON.parse(data) : null);
      });
    });
  }
}
