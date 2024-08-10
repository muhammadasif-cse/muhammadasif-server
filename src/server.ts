import {Server} from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import {errorlogger, logger} from "./shared/logger";

process.on("uncaughtException", (error) => {
  errorlogger.error("Uncaught Exception:", error);
  process.exit(1);
});

let server: Server;

// Database connection
async function bootstrap() {
  try {
    await mongoose.connect(`${config.database_url}`);
    logger.info("🛢 Database connection successful");
    server = app.listen(config.port, () => {
      logger.info(`Application listening on port http://localhost:${config.port}`);
    });

    server.on("error", (err) => {
      errorlogger.error("Server error:", err);
      process.exit(1);
    });
  } catch (err) {
    errorlogger.error("Failed to connect to the database:", err);
    process.exit(1);
  }

  process.on("unhandledRejection", (error) => {
    errorlogger.error("Unhandled Rejection:", error);
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
  logger.info("SIGTERM is received");
  if (server) {
    server.close(() => {
      logger.info("Server closed");
    });
  }
});
