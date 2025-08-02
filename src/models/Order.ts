import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productIds: number[];

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}