/**
 * config/rate-limit.config.ts — Rate Limiting Configuration
 *
 * Uses express-rate-limit to protect the API from abuse.
 * The global `apiLimiter` is applied to all /api/v1 routes in app.ts.
 *
 * For per-route overrides (e.g., stricter limits on login),
 * create a separate limiter and apply it inside the route class.
 */

// import rateLimit from 'express-rate-limit';
// import { env } from './index';

// export const apiLimiter = rateLimit({
//   windowMs: env.RATE_LIMIT_WINDOW_MS,
//   max: env.RATE_LIMIT_MAX,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: { message: 'Too many requests, please try again later.' },
// });

// Example: Stricter limiter for auth routes
// export const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10,                  // 10 attempts per window
//   message: { message: 'Too many login attempts, please try again later.' },
// });
