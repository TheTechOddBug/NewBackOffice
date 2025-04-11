import AppDataSource from "../data-source.js";
import { Product } from "../entities/Product.js";
import { BadRequestError, NotFoundError } from "../errors/ApiError.js";
import { validate } from "class-validator";


export class ProductService {
  async getAll(): Promise<Product[]> {
    const productRepository = AppDataSource.getRepository(Product);
    return productRepository.find();
  }

  async getById(id: string): Promise<Product | null> {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id });
     if (!product) {
        throw new NotFoundError(`Product with id ${id} not found`);
    }
    if (product === null) {
        throw new NotFoundError(`Product with id ${id} not found`)
    }
    return product;
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const newProduct = new Product();
    Object.assign(newProduct, productData);
    const errors = await validate(newProduct);
    if (errors.length > 0) {
      throw new BadRequestError("Invalid product data", errors);
    }
    const productRepository = AppDataSource.getRepository(Product);
    return productRepository.save(newProduct);
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    const productRepository = AppDataSource.getRepository(Product);
        const existingProduct = await productRepository.findOneBy({ id });
        if (!existingProduct) {
            throw new NotFoundError(`Product with id ${id} not found`);
        }
        Object.assign(existingProduct, productData);

        const errors = await validate(existingProduct);
        if (errors.length > 0) {
            throw new BadRequestError("Invalid product data", errors);
        }

        await productRepository.save(existingProduct);
        return existingProduct;
  }

  async delete(id: string): Promise<boolean> {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await this.getById(id)
    if (!product){
      throw new NotFoundError(`Product with id ${id} not found`)
    }
    const result = await productRepository.delete(id);
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
  }
}
