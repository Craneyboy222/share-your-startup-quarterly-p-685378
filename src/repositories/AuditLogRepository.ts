import { Pool } from 'pg';
import { AuditLog } from '../models/AuditLog';
import { BaseRepository } from './BaseRepository';

export class AuditLogRepository extends BaseRepository {
  constructor(db: Pool) {
    super(db);
  }

  async getAllLogs(): Promise<AuditLog[]> {
    const query = 'SELECT * FROM audit_logs';
    const result = await this.db.query(query);
    return result.rows;
  }

  async createLog(log: AuditLog): Promise<number> {
    const query = `INSERT INTO audit_logs (user_id, action, details, created_at) 
                   VALUES ($1, $2, $3, $4) RETURNING id`;
    const values = [log.user_id, log.action, log.details, log.created_at];
    const result = await this.db.query(query, values);
    return result.rows[0].id;
  }
}