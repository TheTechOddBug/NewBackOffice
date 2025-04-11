import { validate } from "class-validator";
import { UserService } from "../services/UserService.js";
import { plainToInstance } from "class-transformer";
import { BadRequestError } from "../errors/ApiError.js";
import { User } from "../entities/User.js";
export class UserController {
    userService;
    constructor() {
        this.userService = new UserService();
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
            const validatedUser = await this.validateAndTransform(req.body, User);
            res.status(201).json(await this.userService.create(validatedUser));
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const validatedUser = await this.validateAndTransform(req.body, User);
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
        const object = plainToInstance(type, body);
        const errors = await validate(object);
        if (errors.length > 0) {
            const errorMessages = errors
                .map((error) => Object.values(error.constraints)).flat();
            throw new BadRequestError(errorMessages.join(", "));
        }
        return object;
    }
}
