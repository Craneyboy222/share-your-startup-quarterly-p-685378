/* Caching service */
import Redis from 'ioredis';

const redis = new Redis();

export const setCache = async (key: string, value: string, ttl: number) => {
  await redis.set(key, value, 'EX', ttl);
};

export const getCache = async (key: string) => {
  return await redis.get(key);
};

export const deleteCache = async (key: string) => {
  await redis.del(key);
};

export default redis;