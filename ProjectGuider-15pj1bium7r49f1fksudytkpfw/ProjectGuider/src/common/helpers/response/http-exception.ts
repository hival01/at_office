/**
 * common/helpers/response/http-exception.ts — Custom Error Classes
 *
 * All throwable errors should extend HttpException.
 * NEVER throw plain `new Error()` in controllers or services.
 * The error middleware catches these and sends a structured response.
 *
 * Usage:
 *   throw new NotFoundException('User not found');
 *   throw new BadRequestException('Email already exists');
 *   throw new UnauthorizedException('Invalid credentials');
 */

import { HttpStatus } from '../../constants/http.constants';

export class HttpException extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Object.setPrototypeOf(this, HttpException.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends HttpException {
  constructor(message = 'Bad Request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = 'Not Found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class ConflictException extends HttpException {
  constructor(message = 'Conflict') {
    super(message, HttpStatus.CONFLICT);
  }
}

export class InternalServerException extends HttpException {
  constructor(message = 'Internal Server Error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
