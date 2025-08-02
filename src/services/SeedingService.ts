import { databaseService } from './DatabaseService';

class SeedingService {
  async seedData() {
    try {
      // Example seed data
      await databaseService.query('INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4)', ['admin', 'admin@example.com', 'hashed_password', 'admin']);
      console.log('Seeding completed successfully.');
    } catch (err) {
      console.error('Seeding failed:', err);
      throw err;
    }
  }
}

export const seedingService = new SeedingService();