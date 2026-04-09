/**
 * types/express.d.ts — Express Type Declaration Merge
 *
 * Extends the Express Request interface to include custom properties
 * that middlewares attach to the request object.
 *
 * This file uses TypeScript declaration merging to add:
 *   - req.authUser — populated by authMiddleware after JWT verification
 *   - req.listQuery — populated by queryOptionsMiddleware for pagination
 *
 * Without this file, TypeScript will throw errors when accessing
 * these custom properties on the Request object.
 */

// declare namespace Express {
//   interface Request {
//     authUser?: {
//       id: string | number;
//       email: string;
//       role: string;
//       [key: string]: any;
//     };
//     listQuery?: {
//       pageNo: number;
//       limit: number;
//       all: boolean;
//       sortBy: string;
//       sortOrder: 'ASC' | 'DESC';
//     };
//   }
// }
