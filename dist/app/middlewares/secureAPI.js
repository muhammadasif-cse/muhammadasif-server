"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiSecretToken = exports.apiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const secure_api_1 = require("../../constants/secure-api");
// Store to manage retries
const retryCount = {};
// Rate limiter middleware
const apiLimiter = (0, express_rate_limit_1.default)({
    /*
      @@ time limit testing for 30 seconds 30 * 1000, // 30 seconds
      @@ time limit production for 15 minutes 15 * 60 * 1000, // 15 minutes
      @@ max request testing for 3 requests per windowMs
    */
    windowMs: 30 * 1000,
    max: 5,
    message: {
        statusCode: http_status_1.default.TOO_MANY_REQUESTS,
        success: false,
        message: secure_api_1.REQUEST_MESSAGES.TOO_MANY_REQUESTS,
    },
});
exports.apiLimiter = apiLimiter;
// Middleware to check secret token
const apiSecretToken = (req, res, next) => {
    const secretToken = req.headers["x-api-key"];
    const ip = req.ip;
    if (!secretToken) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: secure_api_1.REQUEST_MESSAGES.UNAUTHORIZED,
        });
    }
    if (secretToken !== config_1.default.secret_token) {
        if (!retryCount[ip]) {
            retryCount[ip] = { count: 0 };
        }
        retryCount[ip].count += 1;
        if (retryCount[ip].count >= 5) {
            if (!retryCount[ip].timeout) {
                retryCount[ip].timeout = setTimeout(() => {
                    delete retryCount[ip];
                }, 30 * 1000);
            }
            return (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.TOO_MANY_REQUESTS,
                success: false,
                message: secure_api_1.REQUEST_MESSAGES.TOO_MANY_REQUESTS,
            });
        }
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.FORBIDDEN,
            success: false,
            message: `${secure_api_1.REQUEST_MESSAGES.FORBIDDEN} ${5 - retryCount[ip].count} retries left.`,
        });
    }
    if (retryCount[ip]) {
        clearTimeout(retryCount[ip].timeout);
        delete retryCount[ip];
    }
    next();
};
exports.apiSecretToken = apiSecretToken;
