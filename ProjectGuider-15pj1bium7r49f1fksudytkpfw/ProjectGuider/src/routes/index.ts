/**
 * routes/index.ts — API Router Composition
 *
 * This is where ALL route classes are instantiated and mounted.
 * Routes are NOT auto-discovered — every new module's route class
 * must be manually added to the `routes` array below.
 *
 * The composed router is mounted at /api/v1 in app.ts.
 */

import { Router } from 'express';
import { Routes } from '../common/interfaces/routes.interface';
// Import your route classes here:
// import { UserRoutes } from '../modules/user/routes/user.routes';
// import { AuthRoutes } from '../modules/auth/routes/auth.routes';
// import { HealthRoutes } from '../modules/health/routes/health.routes';

export function buildApiRouter(): Router {
  const router = Router();

  // Instantiate all route classes
  const routes: Routes[] = [
    // new UserRoutes(),
    // new AuthRoutes(),
    // new HealthRoutes(),
  ];

  // Mount each route class on the router
  routes.forEach((route) => {
    router.use(route.path, route.router);
  });

  return router;
}
