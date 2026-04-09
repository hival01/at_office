/**
 * database/mongoose/connection.ts — Mongoose (MongoDB) Connection
 *
 * Connects to MongoDB using Mongoose ODM.
 * Called once during server bootstrap in server.ts.
 *
 * Mongoose is the go-to ODM for MongoDB in Node.js.
 * Unlike SQL ORMs, Mongoose uses schemas to define document structure
 * on top of MongoDB's schema-less collections.
 *
 * Setup:
 *   1. npm install mongoose
 *   2. Set MONGODB_URI in .env
 *   3. Import and call connectMongoose() in server.ts
 *
 * Usage in server.ts:
 *   import { connectMongoose } from './database/mongoose/connection';
 *   await connectMongoose();
 */

// import mongoose from 'mongoose';
// import { env } from '../../config';

// export async function connectMongoose(): Promise<void> {
//   try {
//     await mongoose.connect(env.MONGODB_URI, {
//       // Mongoose 8+ uses these options by default, but you can override:
//       // autoIndex: true,
//       // maxPoolSize: 10,
//     });
//     console.log('Mongoose: MongoDB connection established.');
//   } catch (error) {
//     console.error('Mongoose: Unable to connect to MongoDB:', error);
//     process.exit(1);
//   }
// }

// // Connection event listeners (useful for monitoring)
// mongoose.connection.on('disconnected', () => {
//   console.warn('Mongoose: MongoDB disconnected.');
// });

// mongoose.connection.on('error', (err) => {
//   console.error('Mongoose: MongoDB connection error:', err);
// });

// export { mongoose };
