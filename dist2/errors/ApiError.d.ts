declare abstract class ApiError extends Error {
    readonly statusCode: number;
    readonly cause?: unknown;
    constructor(statusCode: number, message: string, cause?: unknown);
}
declare class BadRequestError extends ApiError {
    constructor(message?: string, cause?: unknown);
}
declare class NotFoundError extends ApiError {
    constructor(message?: string, cause?: unknown);
}
declare class UnauthorizedError extends ApiError {
    constructor(message?: string, cause?: unknown);
}
declare class InternalServerError extends ApiError {
    constructor(message?: string, cause?: unknown);
}
export { ApiError, BadRequestError, NotFoundError, UnauthorizedError, InternalServerError };
