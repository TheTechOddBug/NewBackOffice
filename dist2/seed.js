import { AppDataSource } from "./data-source.js";
import { User } from "./entities/User.js";
import { Product } from "./entities/Product.js";
import testData from "./test-data.json" assert { type: "json" };
async function seed() {
    console.log('Entities loaded:', AppDataSource.options.entities);
    console.log("Initializing AppDataSource...");
    try {
        await AppDataSource.initialize();
        console.log('Metadatas:', AppDataSource.entityMetadatas.map(m => m.name));
        console.log("AppDataSource initialized successfully!");
        console.log("Getting userRepository...");
        const userRepository = AppDataSource.getRepository(User);
        console.log("userRepository retrieved successfully!");
        console.log("Getting productRepository...");
        const productRepository = AppDataSource.getRepository(Product);
        console.log("productRepository retrieved successfully!");
        // Create and save users
        const usersToSave = testData.users.map((userData) => {
            console.log("Creating user:", userData);
            const user = new User();
            user.username = userData.username;
            user.name = userData.name;
            user.password = userData.password;
            console.log("Saving user:", user);
            return user;
        });
        await userRepository.save(usersToSave);
        // Create and save products
        const productsToSave = testData.products.map((productData) => {
            console.log("Creating product:", productData);
            const product = new Product();
            product.name = productData.name;
            product.price = productData.price;
            product.description = productData.description;
            console.log("Saving product:", product);
            return product;
        });
        await productRepository.save(productsToSave);
        console.log("Database seeded successfully!");
    }
    catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error("Error seeding database:", error.message, error.stack);
    }
    finally {
        await AppDataSource.destroy();
    }
}
seed();
