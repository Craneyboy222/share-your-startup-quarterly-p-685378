import { Pool } from 'pg';
import { Discount } from '../models/Discount';
import { BaseRepository } from './BaseRepository';

export class DiscountRepository extends BaseRepository {
  constructor(db: Pool) {
    super(db);
  }

  async getDiscountsByStartupId(startupId: number): Promise<Discount[]> {
    const query = 'SELECT * FROM discounts WHERE startup_id = $1';
    const result = await this.db.query(query, [startupId]);
    return result.rows;
  }

  async createDiscount(discount: Discount): Promise<number> {
    const query = `INSERT INTO discounts (startup_id, code, description, expiry_date) 
                   VALUES ($1, $2, $3, $4) RETURNING id`;
    const values = [discount.startup_id, discount.code, discount.description, discount.expiry_date];
    const result = await this.db.query(query, values);
    return result.rows[0].id;
  }

  async deleteDiscount(discountId: number): Promise<void> {
    const query = 'DELETE FROM discounts WHERE id = $1';
    await this.db.query(query, [discountId]);
  }
}