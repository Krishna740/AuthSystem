import env from '../config/env.js';

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  if (!err.isOperational) console.error('UNEXPECTED ERROR:', err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.details && { details: err.details }),
    ...(env.nodeEnv === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
