/**
 * scripts/seed.ts — Database Seeder Orchestration
 *
 * Entry point for populating the database with initial/test data.
 * Run with: npx ts-node src/scripts/seed.ts
 *
 * This file orchestrates all seeder functions in the correct order
 * (respecting foreign key dependencies).
 *
 * Typical seed order:
 *   1. Roles / Permissions (no dependencies)
 *   2. Admin / system users (depends on roles)
 *   3. Categories / taxonomies
 *   4. Sample data for development
 *
 * Example seeder function:
 *   async function seedRoles() {
 *     const roles = [
 *       { name: 'admin', description: 'Full access' },
 *       { name: 'user', description: 'Standard user' },
 *     ];
 *     // Use your ORM to insert...
 *   }
 */

// import { connectDatabase } from '../database';

// async function seed() {
//   try {
//     await connectDatabase();
//     console.log('Seeding database...');
//
//     // Run seeders in order:
//     // await seedRoles();
//     // await seedAdminUser();
//     // await seedCategories();
//
//     console.log('Database seeded successfully!');
//     process.exit(0);
//   } catch (error) {
//     console.error('Seeding failed:', error);
//     process.exit(1);
//   }
// }

// seed();
