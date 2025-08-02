import { Pool } from 'pg';
import { Startup } from '../models/Startup';
import { BaseRepository } from './BaseRepository';

export class StartupRepository extends BaseRepository {
  constructor(db: Pool) {
    super(db);
  }

  async getStartupById(startupId: number): Promise<Startup | null> {
    const query = 'SELECT * FROM startups WHERE id = $1';
    const result = await this.db.query(query, [startupId]);
    return result.rows[0] || null;
  }

  async createStartup(startup: Startup): Promise<number> {
    const query = `INSERT INTO startups (user_id, name, url, location, stage, goals, discount, created_at) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
    const values = [startup.user_id, startup.name, startup.url, startup.location, startup.stage, startup.goals, startup.discount, startup.created_at];
    const result = await this.db.query(query, values);
    return result.rows[0].id;
  }

  async updateStartup(startup: Startup): Promise<void> {
    const query = `UPDATE startups SET name = $1, url = $2, location = $3, stage = $4, goals = $5, discount = $6 
                   WHERE id = $7`;
    const values = [startup.name, startup.url, startup.location, startup.stage, startup.goals, startup.discount, startup.id];
    await this.db.query(query, values);
  }

  async deleteStartup(startupId: number): Promise<void> {
    const query = 'DELETE FROM startups WHERE id = $1';
    await this.db.query(query, [startupId]);
  }
}