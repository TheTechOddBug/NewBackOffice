import { Request, Response } from 'express';
import { EntityManager } from '../utils/entity-manager.js';
import { DataSource } from 'typeorm';

export class EntityController {
    private readonly entityManager: EntityManager; 

    constructor(dataSource: DataSource) {
        this.entityManager = new EntityManager(dataSource);
    }

    async getEntities(req: Request, res: Response): Promise<void> {
        try {
            const entities = await this.entityManager.getEntities();
            res.json(entities);
        } catch (error) {
            console.error('Error getting entities:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}