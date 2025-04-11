import "reflect-metadata";
import { DataSource } from "typeorm";
const dbType = "sqlite";
const AppDataSource = new DataSource({
    type: dbType,
    database: "database.sqlite",
    entities: ["dist/entities/*.js"],
    migrations: ["src/migrations/*.ts"],
    synchronize: true,
    logging: false,
    subscribers: [],
    migrationsRun: true,
    entitySkipConstructor: true,
});
export default AppDataSource;
