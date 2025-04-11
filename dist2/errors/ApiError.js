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
class BadRequestError extends ApiError {
    constructor(message = "Bad Request", cause) {
        super(400, message, cause);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
class NotFoundError extends ApiError {
    constructor(message = "Not Found", cause) {
        super(404, message, cause);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized", cause) {
        super(401, message, cause);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
class InternalServerError extends ApiError {
    constructor(message = "Internal Server Error", cause) {
        super(500, message, cause);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
export { ApiError, BadRequestError, NotFoundError, UnauthorizedError, InternalServerError };
