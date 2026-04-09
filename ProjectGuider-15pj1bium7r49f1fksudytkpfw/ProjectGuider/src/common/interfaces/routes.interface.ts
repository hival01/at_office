/**
 * common/interfaces/routes.interface.ts — Route Interface
 *
 * Every route class must implement this interface.
 * This ensures consistent structure across all modules.
 *
 * Usage:
 *   class UserRoutes implements Routes {
 *     path = '/users';
 *     router = Router();
 *     ...
 *   }
 */

import { Router } from 'express';

export interface Routes {
  path: string;
  router: Router;
}
