import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/validation_error';
import { DatabaseConnectionError } from '../errors/database_connection_error';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('Something went wrong', err);

    if (err instanceof RequestValidationError) {
        const formattedErorrs = err.errors.map(error => {
            return { message: error.msg, field: error.param };
        })
        return res.status(400).send({ errors: formattedErorrs });
    }

    if (err instanceof DatabaseConnectionError) {
        res.status(500).send({
            errors: [
                { message: err.reason }
            ]
        })
    }

    res.status(400).send({
        errors: [
            { message: 'Something went wrong' }
        ]
    })
};
