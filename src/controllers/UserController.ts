import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";

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
      const userData = req.body;
      const newUser = await this.userService.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await this.userService.update(id, userData);
      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.userService.delete(id);
      if (!success) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}