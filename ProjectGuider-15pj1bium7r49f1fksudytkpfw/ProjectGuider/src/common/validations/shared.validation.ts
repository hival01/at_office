/**
 * common/validations/shared.validation.ts — Shared Validation Rules
 *
 * Reusable Joi validation rules used across multiple modules.
 * Import these in your module-specific validation files to avoid duplication.
 *
 * Examples:
 *   - email validation
 *   - password strength rules
 *   - phone number format
 *   - pagination query params
 *   - MongoDB ObjectId format
 *   - UUID format
 *
 * Usage:
 *   import { emailRule, passwordRule } from '@/common/validations/shared.validation';
 *
 *   const createUserSchema = Joi.object({
 *     email: emailRule.required(),
 *     password: passwordRule.required(),
 *   });
 */

// import Joi from 'joi';

// export const emailRule = Joi.string().email().lowercase().trim();

// export const passwordRule = Joi.string().min(8).max(128);

// export const phoneRule = Joi.string().pattern(/^\+?[\d\s-]{10,15}$/);

// export const mongoIdRule = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);

// export const uuidRule = Joi.string().uuid({ version: 'uuidv4' });

// export const paginationQuerySchema = Joi.object({
//   pageNo: Joi.number().integer().min(1).default(1),
//   limit: Joi.number().integer().min(1).max(100).default(10),
//   all: Joi.boolean().default(false),
//   sortBy: Joi.string().default('createdAt'),
//   sortOrder: Joi.string().valid('ASC', 'DESC').default('DESC'),
// });
