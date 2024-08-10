"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const secureAPI_1 = require("./app/middlewares/secureAPI");
//? call express
const app = (0, express_1.default)();
// for multer file upload
app.use(express_1.default.static("uploads"));
app.set("trust proxy", 1);
//? using cors
app.use((0, cors_1.default)());
//? parse data
app.use(express_1.default.json()); //json data
app.use(express_1.default.urlencoded({ extended: true })); //accept data url or json
//? Calling Routes
app.use("/api/v1", secureAPI_1.apiLimiter, secureAPI_1.apiSecretToken, routes_1.default);
app.get("/", (req, res) => {
    res.send(`<h1 style="color:#242B2E;font-size:62px; text-align:center;margin-top:200px">Server Running...♻️</h1>`);
});
app.use(globalErrorHandler_1.default);
//? handle not found route
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
    next();
});
exports.default = app;
