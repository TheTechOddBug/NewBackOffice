"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.NotFoundError = exports.InternalServerError = exports.BadRequestError = exports.errorHandler = void 0;
const ApiError_js_1 = require("../errors/ApiError.js");
Object.defineProperty(exports, "BadRequestError", { enumerable: true, get: function () { return ApiError_js_1.BadRequestError; } });
Object.defineProperty(exports, "InternalServerError", { enumerable: true, get: function () { return ApiError_js_1.InternalServerError; } });
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return ApiError_js_1.NotFoundError; } });
Object.defineProperty(exports, "UnauthorizedError", { enumerable: true, get: function () { return ApiError_js_1.UnauthorizedError; } });
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError_js_1.BadRequestError || err instanceof ApiError_js_1.InternalServerError || err instanceof ApiError_js_1.NotFoundError || err instanceof ApiError_js_1.UnauthorizedError) {
        res.status(err.statusCode).json({ message: err.message, cause: err.cause });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
};
exports.errorHandler = errorHandler;
