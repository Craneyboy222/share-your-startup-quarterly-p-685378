import { databaseService } from './DatabaseService';
import { migrationScripts } from '../lib/migrations';

class MigrationService {
  async runMigrations() {
    for (const script of migrationScripts) {
      try {
        await databaseService.query(script.up);
        console.log(`Migration ${script.name} applied successfully.`);
      } catch (err) {
        console.error(`Failed to apply migration ${script.name}:`, err);
        throw err;
      }
    }
  }
}

export const migrationService = new MigrationService();