"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = void 0;
class EntityManager {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    getEntities() {
        const entities = this.dataSource.entityMetadatas;
        return entities.map((entity) => ({
            name: entity.name,
            path: entity.tableName,
        }));
    }
}
exports.EntityManager = EntityManager;
