import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

// Handle common PostgreSQL errors from `pg`
const handlePgUniqueViolation = (err: any): AppError => {
  const field = err.constraint || 'unknown_field';
  const message = `Duplicate value violates unique constraint: ${field}`;
  return new AppError(message, 400);
};

const handlePgForeignKeyViolation = (err: any): AppError => {
  return new AppError(`Foreign key constraint failed: ${err.detail}`, 400);
};

const handlePgSyntaxError = (err: any): AppError => {
  return new AppError(`PostgreSQL syntax error: ${err.message}`, 400);
};

// Show full error in development
const sendErrorDev = (err: AppError, res: Response): void => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

// Hide details in production
const sendErrorProd = (err: AppError, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('🔥 UNEXPECTED ERROR:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let customError = err;

  if (process.env.NODE_ENV === 'production') {
    // PostgreSQL error handling
    if (err.code === '23505') customError = handlePgUniqueViolation(err);
    if (err.code === '23503') customError = handlePgForeignKeyViolation(err);
    if (err.code === '42601') customError = handlePgSyntaxError(err);

    sendErrorProd(customError, res);
  } else {
    sendErrorDev(err, res);
  }
};

export default globalErrorHandler;
