"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_js_1 = __importDefault(require("./data-source.js"));
const entity_js_1 = require("./controllers/entity.js");
const user_js_1 = __importDefault(require("./routes/user.js"));
const product_js_1 = __importDefault(require("./routes/product.js"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const app = (0, express_1.default)();
const port = 3001;
data_source_js_1.default.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    app.get('/entities', async (req, res) => {
        await new entity_js_1.EntityController(data_source_js_1.default).getEntities(req, res);
    });
    app.use('/api/users', user_js_1.default);
    app.use('/api/products', product_js_1.default);
    // Error handling middleware must be the last middleware
    app.use(errorHandler_js_1.errorHandler);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((err) => console.error("Error during Data Source initialization:", err));
