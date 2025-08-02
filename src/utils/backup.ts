import { exec } from 'child_process';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'backup.log' })
  ]
});

export const backupDatabase = (backupPath: string) => {
  const command = `pg_dump -U ${process.env.DB_USER} -h ${process.env.DB_HOST} -d ${process.env.DB_NAME} -f ${backupPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      logger.error('Backup failed', { error });
      return;
    }
    logger.info('Backup successful', { stdout });
  });
};