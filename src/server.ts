/* eslint-disable no-console */
import {Server} from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

let server: Server;

// Database connection
async function bootstrap() {
  try {
    await mongoose.connect(`${config.database_url}`);
    console.info("🛢 Database connection successful");
    server = app.listen(config.port, () => {
      console.info(`Application listening on port http://localhost:${config.port}`);
    });

    server.on("error", (err) => {
      console.error("Server error:", err);
      process.exit(1);
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }

  process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection:", error);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on("SIGTERM", () => {
  console.info("SIGTERM is received");
  if (server) {
    server.close(() => {
      console.info("Server closed");
    });
  }
});
