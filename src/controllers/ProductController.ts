import { Request, Response } from "express";
import { ProductService } from "../services/ProductService.js";

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
      const product = await this.productService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Error creating product" });
    }
  };

  update = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const product = await this.productService.update(id, req.body);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating product" });
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
}