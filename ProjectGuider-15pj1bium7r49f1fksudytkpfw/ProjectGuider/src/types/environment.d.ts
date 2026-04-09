/**
 * types/environment.d.ts — Process.env Type Definitions
 *
 * Adds type safety to process.env variables.
 * Without this, all env vars are typed as `string | undefined`.
 * With this file, TypeScript knows which env vars exist and their types.
 *
 * Update this file whenever you add a new env var to .env.example.
 */

// declare namespace NodeJS {
//   interface ProcessEnv {
//     NODE_ENV: 'development' | 'staging' | 'production' | 'test';
//     PORT: string;
//     SITE_URL: string;
//     LOG_LEVEL: string;
//
//     // Database
//     DATABASE_URL: string;
//     DB_HOST: string;
//     DB_PORT: string;
//     DB_NAME: string;
//     DB_USER: string;
//     DB_PASSWORD: string;
//     DB_DIALECT: string;
//     MONGODB_URI: string;
//
//     // JWT
//     JWT_SECRET: string;
//     JWT_EXPIRES_IN: string;
//     JWT_REFRESH_SECRET: string;
//     JWT_REFRESH_EXPIRES_IN: string;
//
//     // File Upload
//     FILE_STORAGE_DRIVER: 'local' | 's3';
//     LOCAL_UPLOAD_DIR: string;
//     MAX_UPLOAD_SIZE_MB: string;
//
//     // AWS
//     AWS_ACCESS_KEY_ID: string;
//     AWS_SECRET_ACCESS_KEY: string;
//     AWS_REGION: string;
//     AWS_S3_BUCKET: string;
//
//     // Email
//     EMAIL_HOST: string;
//     EMAIL_PORT: string;
//     EMAIL_USER: string;
//     EMAIL_PASS: string;
//     EMAIL_FROM: string;
//
//     // Rate Limiting
//     RATE_LIMIT_WINDOW_MS: string;
//     RATE_LIMIT_MAX: string;
//   }
// }
