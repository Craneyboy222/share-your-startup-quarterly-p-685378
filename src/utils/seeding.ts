import { query } from './database';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'seeding.log' })
  ]
});

export const seedDatabase = async (seedSQL: string) => {
  try {
    await query(seedSQL);
    logger.info('Seeding executed successfully');
  } catch (err) {
    logger.error('Seeding failed', { err });
    throw err;
  }
};