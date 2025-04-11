import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity.js';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @Column()
  name!: string; // Add the ! character

  @Column({ type: 'numeric' })
  price!: number; // Add the ! character
}