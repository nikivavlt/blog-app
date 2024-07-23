import type { ErrorRequestHandler } from 'express';
import CustomError from 'src/errors/CustomErrror.js';

const errorMiddleware: ErrorRequestHandler = (error, request, response) => {
  if (error instanceof CustomError) {
    return response.status(error.statusCode).json(error.message);
  }
  return response.status(500).json('Internal server error');
  // if (error instanceof CustomError OR APIERROR) {
  //   const statusCode = error.status;
  //   const message = error.message;
  //   return response.status(statusCode).json(message);
  // }
  // logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
  // return response.status(500).json('Internal server error'); // Unexpected error, ApiError.internal('Unexpected error')
};

export default errorMiddleware;
