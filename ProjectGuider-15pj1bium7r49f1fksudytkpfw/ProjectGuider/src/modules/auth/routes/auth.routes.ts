/**
 * modules/auth/routes/auth.routes.ts — Auth Routes
 *
 * Authentication endpoints. Most auth routes do NOT require authMiddleware
 * since the user is not yet authenticated (login, register).
 *
 * Stricter rate limiting should be applied to auth routes
 * to prevent brute-force attacks (see config/rate-limit.config.ts).
 *
 * Remember to register this in src/routes/index.ts:
 *   import { AuthRoutes } from '../modules/auth/routes/auth.routes';
 *   const routes: Routes[] = [new AuthRoutes()];
 */

// import { Router } from 'express';
// import { Routes } from '../../../common/interfaces/routes.interface';
// import { AuthController } from '../controller/auth.controller';
// import { validate } from '../../../middlewares/validation.middleware';
// import { registerSchema, loginSchema } from '../validation/auth.validation';

// export class AuthRoutes implements Routes {
//   path = '/auth';
//   router = Router();
//   controller = new AuthController();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes(): void {
//     this.router.post('/register', validate(registerSchema, 'body'), this.controller.register);
//     this.router.post('/login', validate(loginSchema, 'body'), this.controller.login);
//     this.router.post('/refresh', this.controller.refreshToken);
//     this.router.post('/forgot-password', this.controller.forgotPassword);
//     this.router.post('/reset-password', this.controller.resetPassword);
//   }
// }
