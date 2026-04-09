/**
 * database/prisma/client.ts — Prisma Client Singleton
 *
 * Creates and exports a single Prisma client instance for the entire app.
 * Uses the singleton pattern to prevent multiple instances in development
 * (hot-reload can cause connection leaks without this).
 *
 * Works with: PostgreSQL, MySQL, SQLite, SQL Server, MongoDB
 *
 * Setup steps:
 *   1. npm install prisma @prisma/client
 *   2. npx prisma init (creates prisma/schema.prisma)
 *   3. Define your models in schema.prisma
 *   4. npx prisma migrate dev --name init (creates DB tables)
 *   5. npx prisma generate (generates the client)
 *
 * Usage in repositories:
 *   import { prisma } from '@/database/prisma/client';
 *   const users = await prisma.user.findMany();
 */

// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
//   });

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }

// export async function connectPrisma(): Promise<void> {
//   try {
//     await prisma.$connect();
//     console.log('Prisma: Database connection established.');
//   } catch (error) {
//     console.error('Prisma: Unable to connect to database:', error);
//     process.exit(1);
//   }
// }

// export async function disconnectPrisma(): Promise<void> {
//   await prisma.$disconnect();
// }
