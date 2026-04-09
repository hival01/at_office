/**
 * modules/user/routes/user.routes.ts — User Routes
 *
 * Class-based route definition. Implements the Routes interface.
 * Middleware is applied per-route in the order specified.
 *
 * Middleware ordering matters:
 *   1. authMiddleware (verify JWT)
 *   2. checkRole (RBAC — optional, for restricted routes)
 *   3. validate (request validation)
 *   4. controller method
 *
 * Routes are NOT auto-discovered. After creating this class,
 * you MUST register it in src/routes/index.ts:
 *   import { UserRoutes } from '../modules/user/routes/user.routes';
 *   const routes: Routes[] = [new UserRoutes()];
 */

// import { Router } from 'express';
// import { Routes } from '../../../common/interfaces/routes.interface';
// import { UserController } from '../controller/user.controller';
// import { validate } from '../../../middlewares/validation.middleware';
// import { createUserSchema, updateUserSchema } from '../validation/user.validation';
// import { authMiddleware } from '../../../middlewares/auth.middleware';

// export class UserRoutes implements Routes {
//   path = '/users';
//   router = Router();
//   controller = new UserController();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes(): void {
//     this.router.get('/', authMiddleware, this.controller.getAll);
//     this.router.get('/:id', authMiddleware, this.controller.getById);
//     this.router.post('/', authMiddleware, validate(createUserSchema, 'body'), this.controller.create);
//     this.router.put('/:id', authMiddleware, validate(updateUserSchema, 'body'), this.controller.update);
//     this.router.delete('/:id', authMiddleware, this.controller.delete);
//   }
// }
