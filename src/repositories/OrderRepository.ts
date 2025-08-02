import { Pool } from 'pg';
import { Comment } from '../models/Comment';
import { BaseRepository } from './BaseRepository';

export class CommentRepository extends BaseRepository {
  constructor(db: Pool) {
    super(db);
  }

  async getCommentsByStartupId(startupId: number): Promise<Comment[]> {
    const query = 'SELECT * FROM comments WHERE startup_id = $1';
    const result = await this.db.query(query, [startupId]);
    return result.rows;
  }

  async createComment(comment: Comment): Promise<number> {
    const query = `INSERT INTO comments (user_id, startup_id, content, created_at) 
                   VALUES ($1, $2, $3, $4) RETURNING id`;
    const values = [comment.user_id, comment.startup_id, comment.content, comment.created_at];
    const result = await this.db.query(query, values);
    return result.rows[0].id;
  }

  async deleteComment(commentId: number): Promise<void> {
    const query = 'DELETE FROM comments WHERE id = $1';
    await this.db.query(query, [commentId]);
  }
}