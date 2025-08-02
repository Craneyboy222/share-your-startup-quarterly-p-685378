import { Pool } from 'pg';
import { config } from '../config';

class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: config.databaseUrl,
    });
  }

  async query(text: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(text, params);
      return res.rows;
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    } finally {
      client.release();
    }
  }
}

export const databaseService = new DatabaseService();