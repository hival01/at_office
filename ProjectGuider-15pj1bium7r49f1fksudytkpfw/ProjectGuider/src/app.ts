/**
 * app.ts — Express App Factory
 *
 * Creates and configures the Express application.
 * Middleware is registered in a specific order — do NOT rearrange without understanding the impact.
 *
 * Middleware order:
 *   1. Security middlewares (helmet, hpp, cors)
 *   2. Body parsers (json, urlencoded)
 *   3. Compression
 *   4. Custom middlewares (request context, query parsing)
 *   5. Static files
 *   6. API routes (with rate limiter)
 *   7. Error handlers (404 + global error handler — MUST be last)
 */

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import { buildApiRouter } from './routes';
import { notFoundMiddleware, errorMiddleware } from './middlewares/error.middleware';
// import { requestContextMiddleware } from './middlewares/request-context.middleware';
// import { queryOptionsMiddleware } from './middlewares/query-options.middleware';
// import { apiLimiter } from './config/rate-limit.config';

export function createApp(): Application {
  const app = express();

  // --- Security ---
  app.use(helmet());
  app.use(hpp());
  app.use(
    cors({
      origin: process.env.NODE_ENV === 'production' ? process.env.SITE_URL : '*',
      credentials: true,
    }),
  );

  // --- Body Parsing ---
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  // --- Compression ---
  app.use(compression());

  // --- Custom Middleware ---
  // app.use(requestContextMiddleware);
  // app.use(queryOptionsMiddleware);

  // --- Disable x-powered-by ---
  app.disable('x-powered-by');

  // --- Static Files ---
  app.use('/public', express.static('public'));

  // --- Health Check ---
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // --- API Routes ---
  // app.use('/api/v1', apiLimiter, buildApiRouter());
  app.use('/api/v1', buildApiRouter());

  // --- Error Handling (MUST be last) ---
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
