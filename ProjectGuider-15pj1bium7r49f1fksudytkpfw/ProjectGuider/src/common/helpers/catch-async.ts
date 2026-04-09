/**
 * common/helpers/catch-async.ts — Async Error Wrapper
 *
 * Wraps async controller functions so you don't need try/catch in every handler.
 * Errors are automatically forwarded to Express's error middleware.
 *
 * Usage in controller:
 *   getUsers = catchAsync(async (req, res) => {
 *     const users = await this.userService.findAll();
 *     generalResponse({ req, res, data: users });
 *   });
 */

import { Request, Response, NextFunction } from 'express';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const catchAsync = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
};
