/**
 * database/sequelize/connection.ts — Sequelize Database Connection
 *
 * Initializes the Sequelize instance and auto-loads all model files.
 * Called once during server bootstrap in server.ts.
 *
 * This file:
 *   1. Creates the Sequelize instance (from DATABASE_URL or individual params)
 *   2. Auto-discovers and loads all *.model.ts files from the models/ directory
 *   3. Exports db.authenticate() for use in bootstrap
 *
 * Usage in server.ts:
 *   import { connectSequelize } from './database/sequelize/connection';
 *   await connectSequelize();
 */

// import { Sequelize } from 'sequelize-typescript';
// import path from 'path';
// import { env } from '../../config';

// const sequelize = new Sequelize({
//   database: env.DB_NAME,
//   username: env.DB_USER,
//   password: env.DB_PASSWORD,
//   host: env.DB_HOST,
//   port: env.DB_PORT,
//   dialect: env.DB_DIALECT as any,
//   logging: env.isDev ? console.log : false,
//   models: [path.join(__dirname, 'models', '**', '*.model.{ts,js}')],
// });

// export async function connectSequelize(): Promise<void> {
//   try {
//     await sequelize.authenticate();
//     console.log('Sequelize: Database connection established.');
//   } catch (error) {
//     console.error('Sequelize: Unable to connect to database:', error);
//     process.exit(1);
//   }
// }

// export { sequelize };
