import { Pool } from 'pg';
import { User } from '../models/User';
import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository {
  constructor(db: Pool) {
    super(db);
  }

  async getUserById(userId: number): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await this.db.query(query, [userId]);
    return result.rows[0] || null;
  }

  async createUser(user: User): Promise<number> {
    const query = `INSERT INTO users (username, email, password_hash, role) 
                   VALUES ($1, $2, $3, $4) RETURNING id`;
    const values = [user.username, user.email, user.password_hash, user.role];
    const result = await this.db.query(query, values);
    return result.rows[0].id;
  }

  async updateUser(user: User): Promise<void> {
    const query = `UPDATE users SET username = $1, email = $2, password_hash = $3, role = $4 
                   WHERE id = $5`;
    const values = [user.username, user.email, user.password_hash, user.role, user.id];
    await this.db.query(query, values);
  }

  async deleteUser(userId: number): Promise<void> {
    const query = 'DELETE FROM users WHERE id = $1';
    await this.db.query(query, [userId]);
  }
}