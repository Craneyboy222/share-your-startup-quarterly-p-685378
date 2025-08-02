import { Pool } from 'pg';
import { Vote } from '../models/Vote';
import { BaseRepository } from './BaseRepository';

export class VoteRepository extends BaseRepository {
  constructor(db: Pool) {
    super(db);
  }

  async getVotesByStartupId(startupId: number): Promise<Vote[]> {
    const query = 'SELECT * FROM votes WHERE startup_id = $1';
    const result = await this.db.query(query, [startupId]);
    return result.rows;
  }

  async createVote(vote: Vote): Promise<number> {
    const query = `INSERT INTO votes (user_id, startup_id, vote_type) 
                   VALUES ($1, $2, $3) RETURNING id`;
    const values = [vote.user_id, vote.startup_id, vote.vote_type];
    const result = await this.db.query(query, values);
    return result.rows[0].id;
  }

  async deleteVote(voteId: number): Promise<void> {
    const query = 'DELETE FROM votes WHERE id = $1';
    await this.db.query(query, [voteId]);
  }
}