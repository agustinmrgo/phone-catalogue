export const errorHandler = (err, req, res, _next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  // Default error
  const error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors).map(e => e.message).join(', ');
    error.status = 400;
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    error.message = 'Invalid resource ID';
    error.status = 400;
  }

  // Duplicate key error
  if (err.code === 11000) {
    error.message = 'Duplicate resource';
    error.status = 400;
  }

  // CORS error
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
