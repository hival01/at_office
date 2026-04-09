/**
 * modules/health/routes/health.routes.ts — Health Check Route
 *
 * Simple health check endpoint for load balancers, monitoring,
 * and deployment readiness probes.
 *
 * GET /api/v1/health → { status: 'ok', uptime: ..., timestamp: ... }
 *
 * This is a minimal module — no service/repository/validation needed.
 */

// import { Router, Request, Response } from 'express';
// import { Routes } from '../../../common/interfaces/routes.interface';

// export class HealthRoutes implements Routes {
//   path = '/health';
//   router = Router();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes(): void {
//     this.router.get('/', (_req: Request, res: Response) => {
//       res.json({
//         status: 'ok',
//         uptime: process.uptime(),
//         timestamp: new Date().toISOString(),
//         environment: process.env.NODE_ENV,
//       });
//     });
//   }
// }
