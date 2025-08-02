import { Pool, QueryResult } from 'pg';

export class BaseRepository {
  protected db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  protected async executeQuery(query: string, params: any[] = []): Promise<QueryResult> {
    try {
      return await this.db.query(query, params);
    } catch (error) {
      console.error('Database query error:', error);
      throw new Error('Database query error');
    }
  }
}