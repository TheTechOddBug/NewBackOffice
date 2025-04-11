"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.UnauthorizedError = exports.NotFoundError = exports.BadRequestError = exports.ApiError = void 0;
class ApiError extends Error {
    statusCode;
    cause;
    constructor(statusCode, message, cause) {
        super(message);
        this.statusCode = statusCode;
        this.cause = cause;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
exports.ApiError = ApiError;
class BadRequestError extends ApiError {
    constructor(message = "Bad Request", cause) {
        super(400, message, cause);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends ApiError {
    constructor(message = "Not Found", cause) {
        super(404, message, cause);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized", cause) {
        super(401, message, cause);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class InternalServerError extends ApiError {
    constructor(message = "Internal Server Error", cause) {
        super(500, message, cause);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
exports.InternalServerError = InternalServerError;
