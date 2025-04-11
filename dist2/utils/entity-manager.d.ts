import { DataSource } from 'typeorm';
export declare class EntityManager {
    private dataSource;
    constructor(dataSource: DataSource);
    getEntities(): {
        name: string;
        path: string;
    }[];
}
