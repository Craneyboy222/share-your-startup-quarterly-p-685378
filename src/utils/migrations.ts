import { query } from './database';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'migration.log' })
  ]
});

export const runMigration = async (migrationSQL: string) => {
  try {
    await query(migrationSQL);
    logger.info('Migration executed successfully');
  } catch (err) {
    logger.error('Migration failed', { err });
    throw err;
  }
};