"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var dbType = "sqlite";
var AppDataSource = new typeorm_1.DataSource({
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
exports.default = AppDataSource;
