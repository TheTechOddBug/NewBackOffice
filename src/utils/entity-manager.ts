import { DataSource, EntityMetadata } from 'typeorm'

export class EntityManager {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  getEntities(): { name: string; path: string }[] {
    const entities: EntityMetadata[] = this.dataSource.entityMetadatas;
    return entities.map((entity) => ({
      name: entity.name,
      path: entity.tableName,
    }));
  }
}