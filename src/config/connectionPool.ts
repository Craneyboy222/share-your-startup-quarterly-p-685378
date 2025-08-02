/* Connection pool configuration */
import { PoolConfig } from 'pg';

export const CONNECTION_POOL_CONFIG: PoolConfig = {
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Wait 2 seconds for a connection
  ssl: {
    require: true, // Require SSL
    rejectUnauthorized: false // Allow self-signed certificates for development
  }
};