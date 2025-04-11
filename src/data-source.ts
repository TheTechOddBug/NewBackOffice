import "reflect-metadata";
import { DataSource } from "typeorm";
import { DatabaseType } from "typeorm";
import { User } from "./entities/User";
import { Product } from "./entities/Product";
import { BaseEntity } from "./entities/BaseEntity";

const dbType: DatabaseType = "sqlite";

export const AppDataSource = new DataSource({
  type: dbType,
  database: "database.sqlite",
  entities: [BaseEntity, User, Product],
  migrations: ["src/migrations/*.ts"],
  synchronize: true,
  logging: false,
  subscribers: [],
  migrationsRun: true,
  entitySkipConstructor: true,
});
