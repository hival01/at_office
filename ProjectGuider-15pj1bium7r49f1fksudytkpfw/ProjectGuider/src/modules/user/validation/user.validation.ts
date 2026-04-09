/**
 * modules/user/validation/user.validation.ts — User Joi Schemas
 *
 * Defines Joi validation schemas for user-related endpoints.
 * Used with the validate() middleware in route definitions.
 *
 * Best practices:
 *   - One schema per endpoint (createUser, updateUser, etc.)
 *   - Keep schemas co-located with their module, not in a global folder
 *   - Shared validations (e.g., email, phone) go in src/common/validations/
 *
 * Usage in routes:
 *   this.router.post('/users', validate(createUserSchema, 'body'), this.controller.create);
 */

// import Joi from 'joi';

// export const createUserSchema = Joi.object({
//   name: Joi.string().min(2).max(100).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(8).max(128).required(),
//   role: Joi.string().valid('user', 'admin').default('user'),
// });

// export const updateUserSchema = Joi.object({
//   name: Joi.string().min(2).max(100),
//   email: Joi.string().email(),
//   role: Joi.string().valid('user', 'admin'),
// }).min(1); // At least one field required for update

// export const getUserByIdSchema = Joi.object({
//   id: Joi.string().required(),
// });
