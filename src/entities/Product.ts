import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

@Entity({ name: "products" })
export class Product extends BaseEntity {
  @Column({ type: "varchar" })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Column({ type: "numeric" })
  @IsNumber()
  @IsPositive()
  price!: number;

  @Column({ type: "text" })
  @IsString()
  description!: string;
}