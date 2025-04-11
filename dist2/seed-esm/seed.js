import AppDataSource from "./data-source.js";
import { User } from "./entities/User.js";
import { Product } from "./entities/Product.js";
AppDataSource.setOptions({ ...AppDataSource.options, entities: [User, Product] });
AppDataSource.initialize();
async function seed() {
    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);
    const user1 = new User();
    user1.username = "user1";
    user1.name = "User 1";
    user1.password = "password1";
    await userRepository.save(user1);
    const user2 = new User();
    user2.username = "user2";
    user2.name = "User 2";
    user2.password = "password2";
    await userRepository.save(user2);
    const product1 = new Product();
    product1.name = "Product 1";
    product1.price = 10;
    product1.description = "Description 1";
    await productRepository.save(product1);
    const product2 = new Product();
    product2.name = "Product 2";
    product2.price = 20;
    product2.description = "Description 2";
    await productRepository.save(product2);
    const product3 = new Product();
    product3.name = "Product 3";
    product3.price = 30;
    product3.description = "Description 3";
    await productRepository.save(product3);
    try {
        console.log("Database seeded successfully!");
    }
    catch (error) {
        console.error("Error seeding database:", error);
    }
    finally {
        await AppDataSource.destroy();
    }
}
seed();
