/**
 * middlewares/auth.middleware.ts — JWT Authentication Middleware
 *
 * Verifies the Bearer token from the Authorization header.
 * On success, populates req.authUser with the decoded token payload.
 * On failure, throws UnauthorizedException.
 *
 * Usage in routes:
 *   this.router.get('/profile', authMiddleware, this.controller.getProfile);
 *
 * The decoded user object is available as req.authUser in controllers.
 * See src/types/express.d.ts for the type declaration merge.
 */

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { env } from '../config';
// import { UnauthorizedException } from '../common/helpers/response/http-exception';

// export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
//   const authHeader = req.headers.authorization;
//
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     throw new UnauthorizedException('No token provided');
//   }
//
//   const token = authHeader.split(' ')[1];
//
//   try {
//     const decoded = jwt.verify(token, env.JWT_SECRET);
//     req.authUser = decoded as any; // Type this properly based on your user model
//     next();
//   } catch (error) {
//     throw new UnauthorizedException('Invalid or expired token');
//   }
// }
