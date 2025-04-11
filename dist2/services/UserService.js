import { AppDataSource } from "../data-source";
import { User } from "../entities/User.js";
import { BadRequestError, NotFoundError } from "../errors/ApiError.js";
import { validate } from "class-validator";
import { instanceToPlain } from "class-transformer";
export class UserService {
    userRepository = AppDataSource.getRepository(User);
    async getAll() {
        return this.userRepository.find();
    }
    async getById(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    }
    async create(userData) {
        const user = this.userRepository.create(instanceToPlain(userData));
        const errors = await validate(user);
        if (errors.length > 0) {
            throw new BadRequestError(errors.join(","));
        }
        return await this.userRepository.save(user);
    }
    async update(id, userData) {
        const userToUpdate = await this.getById(id);
        if (!userToUpdate) {
            throw new NotFoundError("User not found");
        }
        this.userRepository.merge(userToUpdate, instanceToPlain(userData));
        const errors = await validate(userToUpdate);
        if (errors.length > 0) {
            throw new BadRequestError(errors.join(","));
        }
        const result = await this.userRepository.update(id, userToUpdate);
        if (!result.affected) {
            throw new NotFoundError("User not found");
        }
        return this.getById(id);
    }
    async delete(id) {
        const result = await this.userRepository.delete(id);
        if (!result.affected || result.affected === 0) {
            throw new NotFoundError("User not found");
        }
    }
}
