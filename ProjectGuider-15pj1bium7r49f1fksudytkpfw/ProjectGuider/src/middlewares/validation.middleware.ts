/**
 * middlewares/validation.middleware.ts — Joi Request Validation
 *
 * Validates request data (body, query, or params) against a Joi schema.
 * Strips unknown fields by default to prevent unexpected data from reaching controllers.
 *
 * Usage in routes:
 *   import Joi from 'joi';
 *
 *   const createUserSchema = Joi.object({ name: Joi.string().required(), ... });
 *   this.router.post('/users', validate(createUserSchema, 'body'), this.controller.create);
 */

// import { Request, Response, NextFunction } from 'express';
// import Joi from 'joi';
// import { BadRequestException } from '../common/helpers/response/http-exception';

// type ValidationSource = 'body' | 'query' | 'params';

// export function validate(schema: Joi.ObjectSchema, source: ValidationSource = 'body') {
//   return (req: Request, _res: Response, next: NextFunction): void => {
//     const { error, value } = schema.validate(req[source], {
//       abortEarly: false,
//       stripUnknown: true,
//     });
//
//     if (error) {
//       const messages = error.details.map((detail) => detail.message).join(', ');
//       throw new BadRequestException(messages);
//     }
//
//     req[source] = value;
//     next();
//   };
// }
