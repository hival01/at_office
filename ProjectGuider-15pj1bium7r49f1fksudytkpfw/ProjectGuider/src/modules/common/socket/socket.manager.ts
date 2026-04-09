/**
 * modules/common/socket/socket.manager.ts — Socket.IO Manager (Singleton)
 *
 * Wraps the HTTP server and manages Socket.IO namespaces.
 * Uses the Singleton pattern — only one instance exists per process.
 *
 * Usage in server.ts:
 *   const socketManager = SocketManager.getInstance();
 *   socketManager.init(httpServer);
 *   const chatNamespace = socketManager.getNamespace('/chat');
 *   new ChatGateway(chatNamespace);
 */

// import { Server as HttpServer } from 'http';
// import { Server, Namespace } from 'socket.io';

// export class SocketManager {
//   private static instance: SocketManager;
//   private io!: Server;

//   private constructor() {}

//   static getInstance(): SocketManager {
//     if (!SocketManager.instance) {
//       SocketManager.instance = new SocketManager();
//     }
//     return SocketManager.instance;
//   }

//   init(server: HttpServer): void {
//     this.io = new Server(server, {
//       cors: {
//         origin: process.env.NODE_ENV === 'production' ? process.env.SITE_URL : '*',
//         methods: ['GET', 'POST'],
//       },
//     });
//   }

//   getNamespace(namespace: string): Namespace {
//     return this.io.of(namespace);
//   }

//   getIO(): Server {
//     return this.io;
//   }
// }
