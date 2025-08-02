import { Pool } from 'pg';
import { config } from '../config';

class ConnectionPoolService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: config.databaseUrl,
      max: 20, // Maximum number of connections
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
      connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
    });
  }

  getPool() {
    return this.pool;
  }
}

export const connectionPoolService = new ConnectionPoolService();