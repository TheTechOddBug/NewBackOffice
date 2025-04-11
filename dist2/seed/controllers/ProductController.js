"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductService_js_1 = require("../services/ProductService.js");
const class_validator_1 = require("class-validator");
const ApiError_js_1 = require("../errors/ApiError.js");
const class_transformer_1 = require("class-transformer");
const Product_js_1 = require("../entities/Product.js");
class ProductController {
    productService;
    constructor() {
        this.productService = new ProductService_js_1.ProductService();
    }
    getAll = async (req, res) => {
        try {
            const products = await this.productService.getAll();
            res.json(products);
        }
        catch (error) {
            res.status(500).json({ error: "Error getting products" });
        }
    };
    getById = async (req, res) => {
        const id = req.params.id;
        try {
            const product = await this.productService.getById(id);
            if (product) {
                res.json(product);
            }
            else {
                res.status(404).json({ error: "Product not found" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Error getting product" });
        }
    };
    create = async (req, res) => {
        try {
            const validatedProduct = await this.validateAndTransform(req.body, Product_js_1.Product);
            const product = await this.productService.create(validatedProduct);
            res.status(201).json(product);
        }
        catch (error) {
            if (error instanceof ApiError_js_1.BadRequestError) {
                res.status(400).json({ error: error.message });
            }
            else {
                console.log(error);
                res.status(500).json({ error: "Error creating product" });
            }
        }
    };
    update = async (req, res) => {
        const id = req.params.id;
        try {
            const validatedProduct = await this.validateAndTransform(req.body, Product_js_1.Product);
            const product = await this.productService.update(id, validatedProduct);
            if (product) {
                res.json(product);
            }
        }
        catch (error) {
            if (error instanceof ApiError_js_1.BadRequestError) {
                res.status(400).json({ error: error.message });
            }
            else if (error instanceof ApiError_js_1.NotFoundError) {
                res.status(404).json({ error: error.message });
            }
            else {
                console.log(error);
                res.status(500).json({ error: "Error updating product" });
            }
        }
    };
    delete = async (req, res) => {
        const id = req.params.id;
        try {
            const product = await this.productService.delete(id);
            if (product) {
                res.json({ message: "Product deleted" });
            }
            else {
                res.status(404).json({ error: "Product not found" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Error deleting product" });
        }
    };
    async validateAndTransform(body, type) {
        const object = (0, class_transformer_1.plainToInstance)(type, body);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            const errorMessages = errors.map((error) => Object.values(error.constraints)).flat();
            throw new ApiError_js_1.BadRequestError(errorMessages.join(", "));
        }
        return object;
    }
}
exports.ProductController = ProductController;
