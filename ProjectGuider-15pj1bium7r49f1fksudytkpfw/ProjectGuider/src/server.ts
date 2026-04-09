/**
 * server.ts — Process Bootstrap
 *
 * This is the main entry point of the application.
 * It initializes the database connection, starts the HTTP server,
 * optionally sets up Socket.IO, and registers graceful shutdown handlers.
 *
 * Boot sequence:
 *   1. Load environment variables
 *   2. Connect to the database
 *   3. Create the Express app via createApp()
 *   4. Start the HTTP server
 *   5. (Optional) Initialize Socket.IO
 *   6. Register process signal handlers for graceful shutdown
 */

import http from 'http';
import { createApp } from './app';
// import { env } from './config';
// import { connectDatabase } from './database';           // <-- Uncomment based on your DB choice
// import { SocketManager } from './modules/common/socket/socket.manager';

const PORT = process.env.PORT || 3000;

async function bootstrap(): Promise<void> {
  try {
    // Step 1: Connect to database
    // await connectDatabase();

    // Step 2: Create Express app
    const app = createApp();

    // Step 3: Create HTTP server
    const server = http.createServer(app);

    // Step 4: (Optional) Initialize Socket.IO
    // const socketManager = SocketManager.getInstance();
    // socketManager.init(server);

    // Step 5: Start listening
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Step 6: Graceful shutdown
    setupProcessHandlers(server);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

function setupProcessHandlers(server: http.Server): void {
  const shutdown = (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log('HTTP server closed.');
      // Close database connections here
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
  });
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });
}

bootstrap();
