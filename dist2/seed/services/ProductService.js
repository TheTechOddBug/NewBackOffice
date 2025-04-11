"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const data_source_js_1 = __importDefault(require("../data-source.js"));
const Product_js_1 = require("../entities/Product.js");
const ApiError_js_1 = require("../errors/ApiError.js");
const class_validator_1 = require("class-validator");
class ProductService {
    async getAll() {
        const productRepository = data_source_js_1.default.getRepository(Product_js_1.Product);
        return productRepository.find();
    }
    async getById(id) {
        const productRepository = data_source_js_1.default.getRepository(Product_js_1.Product);
        const product = await productRepository.findOneBy({ id });
        if (!product) {
            throw new ApiError_js_1.NotFoundError(`Product with id ${id} not found`);
        }
        if (product === null) {
            throw new ApiError_js_1.NotFoundError(`Product with id ${id} not found`);
        }
        return product;
    }
    async create(productData) {
        const newProduct = new Product_js_1.Product();
        Object.assign(newProduct, productData);
        const errors = await (0, class_validator_1.validate)(newProduct);
        if (errors.length > 0) {
            throw new ApiError_js_1.BadRequestError("Invalid product data", errors);
        }
        const productRepository = data_source_js_1.default.getRepository(Product_js_1.Product);
        return productRepository.save(newProduct);
    }
    async update(id, productData) {
        const productRepository = data_source_js_1.default.getRepository(Product_js_1.Product);
        const existingProduct = await productRepository.findOneBy({ id });
        if (!existingProduct) {
            throw new ApiError_js_1.NotFoundError(`Product with id ${id} not found`);
        }
        Object.assign(existingProduct, productData);
        const errors = await (0, class_validator_1.validate)(existingProduct);
        if (errors.length > 0) {
            throw new ApiError_js_1.BadRequestError("Invalid product data", errors);
        }
        await productRepository.save(existingProduct);
        return existingProduct;
    }
    async delete(id) {
        const productRepository = data_source_js_1.default.getRepository(Product_js_1.Product);
        const product = await this.getById(id);
        if (!product) {
            throw new ApiError_js_1.NotFoundError(`Product with id ${id} not found`);
        }
        const result = await productRepository.delete(id);
        return result.affected !== null && result.affected !== undefined && result.affected > 0;
    }
}
exports.ProductService = ProductService;
