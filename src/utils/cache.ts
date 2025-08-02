import NodeCache from 'node-cache';
import { logger } from './logger';

const cache = new NodeCache();

export const setCache = (key: string, value: any, ttl: number = 3600): void => {
  try {
    cache.set(key, value, ttl);
    logger.info(`Cache set for key: ${key}`);
  } catch (error) {
    logger.error(`Failed to set cache for key: ${key}, Error: ${error}`);
  }
};

export const getCache = (key: string): any => {
  try {
    return cache.get(key);
  } catch (error) {
    logger.error(`Failed to get cache for key: ${key}, Error: ${error}`);
    return null;
  }
};

export const deleteCache = (key: string): void => {
  try {
    cache.del(key);
    logger.info(`Cache deleted for key: ${key}`);
  } catch (error) {
    logger.error(`Failed to delete cache for key: ${key}, Error: ${error}`);
  }
};