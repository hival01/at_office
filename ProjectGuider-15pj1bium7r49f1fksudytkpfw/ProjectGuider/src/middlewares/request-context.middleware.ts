/**
 * middlewares/request-context.middleware.ts — Async Request Context
 *
 * Creates an async context per request for request-scoped data like:
 *   - Request ID (for log correlation)
 *   - Locale
 *   - Tenant info (for multi-tenant apps)
 *
 * This allows you to access request-specific data anywhere in the call chain
 * without passing req through every function.
 *
 * Uses Node.js AsyncLocalStorage (built-in, no dependencies).
 */

// import { AsyncLocalStorage } from 'async_hooks';
// import { Request, Response, NextFunction } from 'express';
// import { randomUUID } from 'crypto';

// interface RequestContext {
//   requestId: string;
//   locale?: string;
// }

// export const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

// export function requestContextMiddleware(req: Request, _res: Response, next: NextFunction): void {
//   const requestId = (req.headers['x-request-id'] as string) || randomUUID();
//   const context: RequestContext = { requestId };
//
//   asyncLocalStorage.run(context, () => {
//     next();
//   });
// }
