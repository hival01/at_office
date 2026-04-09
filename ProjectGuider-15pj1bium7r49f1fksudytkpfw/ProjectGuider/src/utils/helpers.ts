/**
 * utils/helpers.ts — Miscellaneous Utility Functions
 *
 * General-purpose helper functions used across the application.
 * Keep functions small, pure, and well-tested.
 *
 * Examples of what goes here:
 *   - String formatting (slugify, capitalize, truncate)
 *   - Date formatting helpers
 *   - Object manipulation (pick, omit, deepClone)
 *   - Pagination calculators
 *   - ID generators
 *
 * What does NOT go here:
 *   - Business logic (belongs in services)
 *   - Database queries (belongs in repositories)
 *   - Request/response handling (belongs in controllers/middlewares)
 */

// export function slugify(text: string): string {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, '')
//     .replace(/[\s_-]+/g, '-')
//     .replace(/^-+|-+$/g, '');
// }

// export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
//   return keys.reduce((result, key) => {
//     if (key in obj) result[key] = obj[key];
//     return result;
//   }, {} as Pick<T, K>);
// }

// export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
//   const result = { ...obj };
//   keys.forEach((key) => delete result[key]);
//   return result;
// }

// export function calculatePagination(total: number, page: number, limit: number) {
//   return {
//     total,
//     page,
//     limit,
//     totalPages: Math.ceil(total / limit),
//     hasNext: page * limit < total,
//     hasPrev: page > 1,
//   };
// }

// export function generateRandomString(length: number = 32): string {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return result;
// }
