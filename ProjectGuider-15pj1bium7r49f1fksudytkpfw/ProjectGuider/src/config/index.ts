/**
 * config/index.ts — Environment Configuration
 *
 * Central place for all environment variables.
 * Validates and exports a typed `env` object so the rest of the app
 * never touches process.env directly.
 *
 * When adding a new env var:
 *   1. Add it to .env.example with a comment
 *   2. Add it here with a type and default value
 *   3. Update the README
 */

import dotenv from 'dotenv';

dotenv.config();

export const env = {
  // Runtime
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

  // Database
  DATABASE_URL: process.env.DATABASE_URL || '',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_NAME: process.env.DB_NAME || 'project_guider_db',
  DB_USER: process.env.DB_USER || 'user',
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',
  DB_DIALECT: process.env.DB_DIALECT || 'postgres',

  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/project_guider_db',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'change-me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'change-me-refresh',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

  // File Upload
  FILE_STORAGE_DRIVER: process.env.FILE_STORAGE_DRIVER || 'local',
  LOCAL_UPLOAD_DIR: process.env.LOCAL_UPLOAD_DIR || 'uploads',
  MAX_UPLOAD_SIZE_MB: parseInt(process.env.MAX_UPLOAD_SIZE_MB || '5', 10),

  // AWS S3
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_REGION || '',
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || '',

  // Email
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || '587', 10),
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@projectguider.com',

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),

  // Helpers
  get isDev(): boolean {
    return this.NODE_ENV === 'development';
  },
  get isProd(): boolean {
    return this.NODE_ENV === 'production';
  },
  get isTest(): boolean {
    return this.NODE_ENV === 'test';
  },
};
