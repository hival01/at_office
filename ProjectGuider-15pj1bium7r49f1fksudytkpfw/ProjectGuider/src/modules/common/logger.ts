/**
 * modules/common/logger.ts — Application Logger
 *
 * Winston-based structured logger with daily log rotation.
 * Logs are written to:
 *   - logs/application/ — info-level and above
 *   - logs/error/ — error-level only
 *   - console — all levels (in development)
 *
 * Usage anywhere in the app:
 *   import { logger } from '@/modules/common/logger';
 *   logger.info('User created', { userId: 123 });
 *   logger.error('Payment failed', { orderId, error });
 *
 * Best practices:
 *   - Use structured metadata objects, NOT string interpolation
 *   - Use logger.info/warn/error, NEVER console.log in production code
 */

// import winston from 'winston';
// import DailyRotateFile from 'winston-daily-rotate-file';

// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || 'debug',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.errors({ stack: true }),
//     winston.format.json(),
//   ),
//   transports: [
//     new DailyRotateFile({
//       dirname: 'logs/application',
//       filename: 'app-%DATE%.log',
//       datePattern: 'YYYY-MM-DD',
//       maxFiles: '14d',
//     }),
//     new DailyRotateFile({
//       dirname: 'logs/error',
//       filename: 'error-%DATE%.log',
//       datePattern: 'YYYY-MM-DD',
//       level: 'error',
//       maxFiles: '30d',
//     }),
//   ],
// });

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
//     }),
//   );
// }

// export { logger };
