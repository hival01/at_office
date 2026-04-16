import app from "./app";
import db from "./config/db";

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  try {
    await db.getConnection().then((connection) => connection.release());
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database.", error);
    process.exit(1);
  }
}

startServer();
