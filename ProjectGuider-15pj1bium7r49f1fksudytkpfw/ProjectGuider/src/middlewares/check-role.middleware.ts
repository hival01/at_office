/**
 * middlewares/check-role.middleware.ts — Role-Based Access Control (RBAC)
 *
 * Checks if the authenticated user has the required role(s) to access a route.
 * MUST be used AFTER authMiddleware (it depends on req.authUser being populated).
 *
 * Usage in routes:
 *   this.router.delete(
 *     '/users/:id',
 *     authMiddleware,
 *     checkRole(['admin']),
 *     this.controller.deleteUser
 *   );
 */

// import { Request, Response, NextFunction } from 'express';
// import { ForbiddenException } from '../common/helpers/response/http-exception';

// export function checkRole(allowedRoles: string[]) {
//   return (req: Request, _res: Response, next: NextFunction): void => {
//     const userRole = req.authUser?.role; // Adjust based on your authUser shape
//
//     if (!userRole || !allowedRoles.includes(userRole)) {
//       throw new ForbiddenException('Access denied. Insufficient permissions.');
//     }
//
//     next();
//   };
// }
