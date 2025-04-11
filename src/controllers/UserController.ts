import { Request, Response } from "express";
import { validate } from "class-validator";
import { UserService } from "../services/UserService.js";
import { plainToInstance } from "class-transformer";
import { BadRequestError } from "../errors/ApiError.js";
import { User } from "../entities/User.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await this.userService.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.getById(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const validatedUser = await this.validateAndTransform(req.body, User);
      res.status(201).json(await this.userService.create(validatedUser));
    } catch (error: unknown) {
      res.status((error as any).statusCode || 500).json({ error: (error as Error).message });
    }
  }
  
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedUser: User = await this.validateAndTransform<User>(req.body, User);

      res.json(await this.userService.update(id, validatedUser));

    } catch (error: unknown) {
      res.status((error as any).statusCode || 500).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.userService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      res.status((error as any).statusCode || 500).json({ error: (error as Error).message });
    }
  }

  private async validateAndTransform<T extends object>(body: object, type: new () => T): Promise<T> {
    const object = plainToInstance(type, body);
    const errors = await validate(object);
    if (errors.length > 0) {
        const errorMessages = errors
            .map((error) => Object.values(error.constraints!)).flat();
        throw new BadRequestError(errorMessages.join(", "));
    }
    return object;
}
}