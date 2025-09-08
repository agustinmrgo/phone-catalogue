import type { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, _next: NextFunction): void => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  const error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  };

  if (err.name === 'ValidationError' && err.errors) {
    error.message = Object.values(err.errors).map(e => e.message).join(', ');
    error.status = 400;
  }

  if (err.name === 'CastError') {
    error.message = 'Invalid resource ID';
    error.status = 400;
  }

  if (err.code === 11000) {
    error.message = 'Duplicate resource';
    error.status = 400;
  }

  if (err.message === 'Not allowed by CORS') {
    console.error('CORS Error:', err.message, 'Origin:', req.headers.origin || 'none');
    error.message = 'CORS policy violation';
    error.status = 403;
  }

  res.status(error.status).json({
    success: false,
    error: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
