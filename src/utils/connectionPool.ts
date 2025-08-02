import { Pool } from 'pg';
import { logError, logInfo } from './logging';

const pool = new Pool({
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0
});

pool.on('error', (err) => {
  logError('Unexpected error on idle client', err);
});

async function query(text: string, params: any[]): Promise<any> {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    logInfo('executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (err) {
    logError('Error executing query', { text, err });
    throw err;
  }
}

export { query, pool };