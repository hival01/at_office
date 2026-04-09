/**
 * modules/auth/validation/auth.validation.ts — Auth Joi Schemas
 *
 * Validation schemas for authentication endpoints.
 *
 * Usage in routes:
 *   this.router.post('/register', validate(registerSchema, 'body'), this.controller.register);
 *   this.router.post('/login', validate(loginSchema, 'body'), this.controller.login);
 */

// import Joi from 'joi';

// export const registerSchema = Joi.object({
//   name: Joi.string().min(2).max(100).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(8).max(128).required(),
// });

// export const loginSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

// export const refreshTokenSchema = Joi.object({
//   refreshToken: Joi.string().required(),
// });

// export const forgotPasswordSchema = Joi.object({
//   email: Joi.string().email().required(),
// });

// export const resetPasswordSchema = Joi.object({
//   token: Joi.string().required(),
//   password: Joi.string().min(8).max(128).required(),
// });
