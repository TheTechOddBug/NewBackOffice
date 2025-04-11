import AppDataSource from "../data-source.js";
import { Product } from "../entities/Product.js";

export class ProductService {
  async getAll(): Promise<Product[]> {
    const productRepository = AppDataSource.getRepository(Product);
    return productRepository.find();
  }

  async getById(id: string): Promise<Product | null> {
    const productRepository = AppDataSource.getRepository(Product);
    return productRepository.findOneBy({ id });
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const productRepository = AppDataSource.getRepository(Product);
    const product = productRepository.create(productData);
    return productRepository.save(product);
  }

  async update(id: string, productData: Partial<Product>): Promise<Product | null> {
    const productRepository = AppDataSource.getRepository(Product);
    const result = await productRepository.update(id, { ...productData });
    if (result.affected === undefined || result.affected === null || result.affected === 0) {
      return null;
    }
    return this.getById(id);
  }

  async delete(id: string): Promise<boolean> {
    const productRepository = AppDataSource.getRepository(Product);
    const result = await productRepository.delete(id);
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
  }
}
