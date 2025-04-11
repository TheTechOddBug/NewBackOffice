"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityController = void 0;
const entity_manager_js_1 = require("../utils/entity-manager.js");
class EntityController {
    entityManager;
    constructor(dataSource) {
        this.entityManager = new entity_manager_js_1.EntityManager(dataSource);
    }
    async getEntities(req, res) {
        try {
            const entities = await this.entityManager.getEntities();
            res.json(entities);
        }
        catch (error) {
            console.error('Error getting entities:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.EntityController = EntityController;
