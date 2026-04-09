/**
 * database/mongoose/models/user.model.ts — User Mongoose Model
 *
 * Defines the User document schema for MongoDB using Mongoose.
 *
 * Key Mongoose concepts:
 *   - Schema: defines the structure, validation, and defaults for documents
 *   - Model: provides the interface for CRUD operations on a collection
 *   - Virtual: computed properties not stored in DB
 *   - Middleware (hooks): pre/post save, find, update, delete
 *   - Index: for query optimization
 *
 * Usage in repository:
 *   import { User } from '@/database/mongoose/models/user.model';
 *   const users = await User.find({ isActive: true });
 *   const user = await User.findOne({ email: 'test@example.com' });
 */

// import mongoose, { Schema, Document } from 'mongoose';

// export interface IUserDocument extends Document {
//   name: string;
//   email: string;
//   password: string;
//   role: 'user' | 'admin';
//   isActive: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const userSchema = new Schema<IUserDocument>(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//       trim: true,
//       maxlength: 100,
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       minlength: 8,
//       select: false, // Don't include password in queries by default
//     },
//     role: {
//       type: String,
//       enum: ['user', 'admin'],
//       default: 'user',
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true, // Auto-generates createdAt and updatedAt
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   },
// );

// // Indexes for common queries
// userSchema.index({ email: 1 });
// userSchema.index({ role: 1, isActive: 1 });

// export const User = mongoose.model<IUserDocument>('User', userSchema);
