import { ErrorRequestHandler } from 'express';
import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '../errors/ApiError.js';
export declare const errorHandler: ErrorRequestHandler;
export { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError };
