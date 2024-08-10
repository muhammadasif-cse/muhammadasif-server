"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});
let server;
// Database connection
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(`${index_1.default.database_url}`);
            console.info("🛢 Database connection successful");
            server = app_1.default.listen(index_1.default.port, () => {
                console.info(`Application listening on port http://localhost:${index_1.default.port}`);
            });
            server.on("error", (err) => {
                console.error("Server error:", err);
                process.exit(1);
            });
        }
        catch (err) {
            console.error("Failed to connect to the database:", err);
            process.exit(1);
        }
        process.on("unhandledRejection", (error) => {
            console.error("Unhandled Rejection:", error);
            if (server) {
                server.close(() => {
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
bootstrap();
process.on("SIGTERM", () => {
    console.info("SIGTERM is received");
    if (server) {
        server.close(() => {
            console.info("Server closed");
            process.exit(0);
        });
    }
    else {
        process.exit(0);
    }
});
