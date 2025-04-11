import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity.js';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity("users")
export class User extends BaseEntity {
  @IsNotEmpty()
  @Column({ nullable: false })
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({
    nullable: false,
    unique: true
  })
  email!: string;
}