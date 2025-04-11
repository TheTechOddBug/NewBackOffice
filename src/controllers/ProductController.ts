import { Request, Response } from "express";
import { ProductService } from "../services/ProductService.js";
import { validate} from "class-validator";
import { BadRequestError,  NotFoundError} from "../errors/ApiError.js";
import { plainToInstance } from "class-transformer";
import { Product } from "../entities/Product.js";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Error getting products" });
    }
  };

  getById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const product = await this.productService.getById(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting product" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const validatedProduct: Product = await this.validateAndTransform<Product>(req.body, Product);

      const product = await this.productService.create(validatedProduct);
      res.status(201).json(product);
    } catch (error: unknown) {
      if (error instanceof BadRequestError) {
        res.status(400).json({ error: error.message });
      } else {
        console.log(error)
        res.status(500).json({ error: "Error creating product" });
      }
    }
  };

  update = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const validatedProduct: Product = await this.validateAndTransform<Product>(req.body, Product);

      const product = await this.productService.update(id, validatedProduct);
      if (product) {
        res.json(product);
      }
    } catch (error: unknown) {
      if (error instanceof BadRequestError) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error)
        res.status(500).json({ error: "Error updating product" });
      }
     }
  };

  delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const product = await this.productService.delete(id);
      if (product) {
        res.json({ message: "Product deleted" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting product" });
    }
  };

  private async validateAndTransform<T extends object>(
    body: object,
    type: new () => T
  ): Promise<T> {
    const object = plainToInstance(type, body);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMessages = errors.map((error) => Object.values(error.constraints!)).flat();
      throw new BadRequestError(errorMessages.join(", "));
    }
    return object;
  }
}
