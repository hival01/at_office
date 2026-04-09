/**
 * middlewares/error.middleware.ts — Global Error Handling
 *
 * Contains two middlewares that MUST be registered last in app.ts:
 *   1. notFoundMiddleware — catches requests to undefined routes (404)
 *   2. errorMiddleware — catches all thrown errors and sends structured response
 *
 * NEVER throw plain Error() objects in your code.
 * Always use HttpException subclasses from common/helpers/response/http-exception.ts
 */

import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../common/helpers/response/http-exception';
import { HttpStatus } from '../common/constants/http.constants';

export function notFoundMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const error = new HttpException(`Route not found: ${req.method} ${req.originalUrl}`, HttpStatus.NOT_FOUND);
  next(error);
}

export function errorMiddleware(
  error: HttpException | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = error instanceof HttpException ? error.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Internal Server Error';

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error]', {
      statusCode,
      message,
      stack: error.stack,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
}
