import { EntityManager } from '../utils/entity-manager.js';
export class EntityController {
    entityManager;
    constructor(dataSource) {
        this.entityManager = new EntityManager(dataSource);
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
