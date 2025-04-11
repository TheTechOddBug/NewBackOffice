import express from 'express';
import cors from 'cors';
import AppDataSource from "./data-source.js";
import { EntityController } from "./controllers/entity.js";
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';

const app = express();
const port = 3001;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.use(cors());
    app.use(express.json());
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
    app.get('/entities', async (req, res) => {
      await new EntityController(AppDataSource).getEntities(req, res);
    });
    app.use('/api/users', userRouter);
    app.use('/api/products', productRouter);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err: unknown) => console.error("Error during Data Source initialization:", err));
