import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity.js';

@Entity("users")
export class User extends BaseEntity {
  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  email!: string;
}