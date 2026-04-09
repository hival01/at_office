/**
 * docs/swagger.setup.ts — Swagger/OpenAPI Setup
 *
 * Configures and mounts Swagger UI on the Express app.
 * Serves interactive API documentation at /api-docs.
 *
 * Two approaches to Swagger:
 *   1. Code-driven (recommended): Build spec programmatically in JS/TS
 *   2. Annotation-driven: Use JSDoc/decorators in route files
 *
 * This file uses swagger-ui-express to serve the spec.
 *
 * Endpoints:
 *   GET /api-docs     — Interactive Swagger UI
 *   GET /api-docs.json — Raw OpenAPI JSON spec
 *
 * Usage in app.ts:
 *   import { setupSwagger } from './docs/swagger.setup';
 *   setupSwagger(app);
 */

// import { Application } from 'express';
// import swaggerUi from 'swagger-ui-express';

// const swaggerDocument = {
//   openapi: '3.0.0',
//   info: {
//     title: 'ProjectGuider API',
//     version: '1.0.0',
//     description: 'API documentation for ProjectGuider backend',
//   },
//   servers: [
//     { url: 'http://localhost:3000/api/v1', description: 'Development' },
//   ],
//   paths: {},
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: 'http',
//         scheme: 'bearer',
//         bearerFormat: 'JWT',
//       },
//     },
//   },
// };

// export function setupSwagger(app: Application): void {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//   app.get('/api-docs.json', (_req, res) => {
//     res.json(swaggerDocument);
//   });
// }
