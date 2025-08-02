import { exec } from 'child_process';
import { config } from '../config';

class BackupService {
  async backupDatabase() {
    const backupCommand = `pg_dump ${config.databaseUrl} > backup.sql`;
    exec(backupCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Error during backup:', error);
        return;
      }
      console.log('Database backup completed successfully.');
    });
  }
}

export const backupService = new BackupService();ch (error) {
      logger.error('Error in backup service', error);
    }
  }

  static async scheduleBackup() {
    try {
      // Assume a function schedule exists to schedule backups
      schedule('0 0 * * *', this.createBackup); // Daily at midnight
      logger.info('Backup scheduled successfully');
    } catch (error) {
      logger.error('Error scheduling backup', error);
    }
  }
}
