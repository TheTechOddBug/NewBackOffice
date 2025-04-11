"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const class_validator_1 = require("class-validator");
const UserService_js_1 = require("../services/UserService.js");
const class_transformer_1 = require("class-transformer");
const ApiError_js_1 = require("../errors/ApiError.js");
const User_js_1 = require("../entities/User.js");
class UserController {
    userService;
    constructor() {
        this.userService = new UserService_js_1.UserService();
    }
    async getAll(req, res) {
        try {
            const users = await this.userService.getAll();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await this.userService.getById(id);
            if (!user) {
                res.status(404).json({ error: "User not found" });
            }
            else {
                res.json(user);
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async create(req, res) {
        try {
            const validatedUser = await this.validateAndTransform(req.body, User_js_1.User);
            res.status(201).json(await this.userService.create(validatedUser));
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const validatedUser = await this.validateAndTransform(req.body, User_js_1.User);
            res.json(await this.userService.update(id, validatedUser));
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await this.userService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async validateAndTransform(body, type) {
        const object = (0, class_transformer_1.plainToInstance)(type, body);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            const errorMessages = errors
                .map((error) => Object.values(error.constraints)).flat();
            throw new ApiError_js_1.BadRequestError(errorMessages.join(", "));
        }
        return object;
    }
}
exports.UserController = UserController;
