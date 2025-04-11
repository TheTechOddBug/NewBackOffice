import { Request, Response } from 'express';
import { DataSource } from 'typeorm';
export declare class EntityController {
    private readonly entityManager;
    constructor(dataSource: DataSource);
    getEntities(req: Request, res: Response): Promise<void>;
}
