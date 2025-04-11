import AppDataSource from "../data-source.js";
import { User } from "../entities/User.js";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const result = await this.userRepository.update(id, userData);
    if (!result.affected) {
        return null;
    }
    return this.getById(id)
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    if(result.affected === undefined || result.affected === null){
        return false;
    }
    return result.affected > 0

  }

}