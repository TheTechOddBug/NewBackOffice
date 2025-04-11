"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const data_source_js_1 = __importDefault(require("../data-source.js"));
const User_js_1 = require("../entities/User.js");
const ApiError_js_1 = require("../errors/ApiError.js");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UserService {
    userRepository = data_source_js_1.default.getRepository(User_js_1.User);
    async getAll() {
        return this.userRepository.find();
    }
    async getById(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new ApiError_js_1.NotFoundError("User not found");
        }
        return user;
    }
    async create(userData) {
        const user = this.userRepository.create((0, class_transformer_1.instanceToPlain)(userData));
        const errors = await (0, class_validator_1.validate)(user);
        if (errors.length > 0) {
            throw new ApiError_js_1.BadRequestError(errors.join(","));
        }
        return await this.userRepository.save(user);
    }
    async update(id, userData) {
        const userToUpdate = await this.getById(id);
        if (!userToUpdate) {
            throw new ApiError_js_1.NotFoundError("User not found");
        }
        this.userRepository.merge(userToUpdate, (0, class_transformer_1.instanceToPlain)(userData));
        const errors = await (0, class_validator_1.validate)(userToUpdate);
        if (errors.length > 0) {
            throw new ApiError_js_1.BadRequestError(errors.join(","));
        }
        const result = await this.userRepository.update(id, userToUpdate);
        if (!result.affected) {
            throw new ApiError_js_1.NotFoundError("User not found");
        }
        return this.getById(id);
    }
    async delete(id) {
        const result = await this.userRepository.delete(id);
        if (!result.affected || result.affected === 0) {
            throw new ApiError_js_1.NotFoundError("User not found");
        }
    }
}
exports.UserService = UserService;
