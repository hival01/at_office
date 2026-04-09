/**
 * middlewares/query-options.middleware.ts — Pagination & Sorting Parser
 *
 * Parses and normalizes common list query params into a typed req.listQuery object.
 * Applied globally in app.ts so all controllers can access req.listQuery.
 *
 * Parsed fields:
 *   - pageNo: number (default 1)
 *   - limit: number (default 10, max 100)
 *   - all: boolean (if true, no pagination applied)
 *   - sortBy: string (default 'createdAt')
 *   - sortOrder: 'ASC' | 'DESC' (default 'DESC')
 *
 * Usage in controllers:
 *   const { pageNo, limit, sortBy, sortOrder } = req.listQuery;
 */

// import { Request, Response, NextFunction } from 'express';

// export interface ListQuery {
//   pageNo: number;
//   limit: number;
//   all: boolean;
//   sortBy: string;
//   sortOrder: 'ASC' | 'DESC';
// }

// export function queryOptionsMiddleware(req: Request, _res: Response, next: NextFunction): void {
//   const query = req.query;
//
//   req.listQuery = {
//     pageNo: Math.max(1, parseInt(query.pageNo as string, 10) || 1),
//     limit: Math.min(100, Math.max(1, parseInt(query.limit as string, 10) || 10)),
//     all: query.all === 'true',
//     sortBy: (query.sortBy as string) || 'createdAt',
//     sortOrder: (query.sortOrder as string)?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
//   };
//
//   next();
// }
