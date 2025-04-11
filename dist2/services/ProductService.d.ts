import { Product } from "../entities/Product.js";
export declare class ProductService {
    getAll(): Promise<Product[]>;
    getById(id: string): Promise<Product | null>;
    create(productData: Partial<Product>): Promise<Product>;
    update(id: string, productData: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<boolean>;
}
