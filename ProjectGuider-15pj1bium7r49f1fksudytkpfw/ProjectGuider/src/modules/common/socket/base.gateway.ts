/**
 * modules/common/socket/base.gateway.ts — Abstract Base Gateway
 *
 * Base class for all Socket.IO gateways. Extend this to create
 * feature-specific gateways (e.g., ChatGateway, NotificationGateway).
 *
 * Each gateway:
 *   1. Receives a Socket.IO Namespace in its constructor
 *   2. Registers event handlers via registerHandlers()
 *   3. Manages connections for that namespace
 *
 * Example:
 *   class ChatGateway extends BaseGateway {
 *     registerHandlers(socket: Socket): void {
 *       socket.on('sendMessage', (data) => this.handleMessage(socket, data));
 *     }
 *   }
 */

// import { Namespace, Socket } from 'socket.io';

// export abstract class BaseGateway {
//   protected namespace: Namespace;

//   constructor(namespace: Namespace) {
//     this.namespace = namespace;
//     this.init();
//   }

//   private init(): void {
//     this.namespace.on('connection', (socket: Socket) => {
//       console.log(`Client connected to ${this.namespace.name}: ${socket.id}`);
//       this.registerHandlers(socket);

//       socket.on('disconnect', (reason: string) => {
//         console.log(`Client disconnected from ${this.namespace.name}: ${socket.id} (${reason})`);
//       });
//     });
//   }

//   protected abstract registerHandlers(socket: Socket): void;
// }
