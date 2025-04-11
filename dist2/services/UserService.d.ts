import { User } from "../entities/User.js";
export declare class UserService {
    private userRepository;
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User>;
    create(userData: Partial<User>): Promise<User>;
    update(id: string, userData: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
}
