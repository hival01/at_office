/**
 * middlewares/socket.middleware.ts — Socket.IO Authentication
 *
 * Validates JWT tokens on Socket.IO namespace connection events.
 * Applied to Socket.IO namespaces, NOT to Express routes.
 *
 * Usage in server.ts or gateway setup:
 *   const namespace = socketManager.getNamespace('/chat');
 *   namespace.use(socketAuthMiddleware);
 */

// import { Socket } from 'socket.io';
// import jwt from 'jsonwebtoken';
// import { env } from '../config';

// export function socketAuthMiddleware(socket: Socket, next: (err?: Error) => void): void {
//   const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];
//
//   if (!token) {
//     return next(new Error('Authentication required'));
//   }
//
//   try {
//     const decoded = jwt.verify(token, env.JWT_SECRET);
//     socket.data.user = decoded;
//     next();
//   } catch (error) {
//     next(new Error('Invalid or expired token'));
//   }
// }
