import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@Entity("users")
@Unique(["email"])
export class User extends BaseEntity {
  @IsNotEmpty()
  @Column({ nullable: false })
  name!: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  username!: string;

  @IsNotEmpty()
  @MinLength(6)
  @Column({ nullable: false })
  password!: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({
    nullable: false,
    unique: true
  })
  email!: string;
}