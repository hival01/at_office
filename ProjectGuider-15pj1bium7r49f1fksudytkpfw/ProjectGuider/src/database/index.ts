/**
 * database/index.ts — Database Connection Entry Point
 *
 * Centralizes database connection logic. Uncomment the appropriate
 * function based on which ORM/ODM you're using.
 *
 * Called from server.ts during bootstrap:
 *   import { connectDatabase } from './database';
 *   await connectDatabase();
 *
 * Choose ONE:
 *   - Sequelize (PostgreSQL/MySQL) — src/database/sequelize/
 *   - Prisma (PostgreSQL/MySQL) — src/database/prisma/
 *   - Mongoose (MongoDB) — src/database/mongoose/
 */

// ============================================================
// Option A: Sequelize (PostgreSQL / MySQL)
// ============================================================
// export { connectSequelize as connectDatabase } from './sequelize/connection';

// ============================================================
// Option B: Prisma (PostgreSQL / MySQL)
// ============================================================
// export { connectPrisma as connectDatabase } from './prisma/client';

// ============================================================
// Option C: Mongoose (MongoDB)
// ============================================================
// export { connectMongoose as connectDatabase } from './mongoose/connection';

// Placeholder export so the file isn't empty
export async function connectDatabase(): Promise<void> {
  console.log('Database connection not configured. Choose an ORM in src/database/index.ts');
}
