import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '../errors/ApiError.js';
export const errorHandler = (err, req, res, next) => {
    if (err instanceof BadRequestError || err instanceof InternalServerError || err instanceof NotFoundError || err instanceof UnauthorizedError) {
        res.status(err.statusCode).json({ message: err.message, cause: err.cause });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
};
export { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError };
