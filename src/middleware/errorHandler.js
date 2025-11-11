import { HttpError } from 'http-errors';
import { MulterError } from 'multer';

export const errorHandler = (err, req, res, next) => {
  console.error('Error Middleware:', err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'File too large. Maximum size is 2MB.',
      });
    }
    return res.status(400).json({
      message: err.message,
    });
  }

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
};
