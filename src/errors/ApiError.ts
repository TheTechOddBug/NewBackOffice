abstract class ApiError extends Error {
  public readonly statusCode: number;
  public readonly cause?: unknown;

  constructor(statusCode: number, message: string, cause?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.cause = cause;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request", cause?: unknown) {
    super(400, message, cause);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

class NotFoundError extends ApiError {
  constructor(message: string = "Not Found", cause?: unknown) {
    super(404, message, cause);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized", cause?: unknown) {
    super(401, message, cause);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

class InternalServerError extends ApiError {
  constructor(message: string = "Internal Server Error", cause?: unknown) {
    super(500, message, cause);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export { ApiError, BadRequestError, NotFoundError, UnauthorizedError, InternalServerError };