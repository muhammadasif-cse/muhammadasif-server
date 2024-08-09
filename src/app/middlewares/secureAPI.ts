/* eslint-disable no-undef */
import {NextFunction, Request, Response} from "express";
import rateLimit from "express-rate-limit";
import httpStatus from "http-status";
import config from "../../config";
import sendResponse from "../../shared/sendResponse";
import {REQUEST_MESSAGES} from "../../constants/secure-api";

// Store to manage retries
const retryCount: {[key: string]: {count: number; timeout?: NodeJS.Timeout}} = {};

// Rate limiter middleware
const apiLimiter = rateLimit({
  /*
    @@ time limit testing for 30 seconds 30 * 1000, // 30 seconds
    @@ time limit production for 15 minutes 15 * 60 * 1000, // 15 minutes
    @@ max request testing for 3 requests per windowMs
  */
  windowMs: 30 * 1000,
  max: 5,
  message: {
    statusCode: httpStatus.TOO_MANY_REQUESTS,
    success: false,
    message: REQUEST_MESSAGES.TOO_MANY_REQUESTS,
  },
});

// Middleware to check secret token
const apiSecretToken = (req: Request, res: Response, next: NextFunction) => {
  const secretToken = req.headers["x-api-key"] as string;
  const ip = req.ip;

  if (!secretToken) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: REQUEST_MESSAGES.UNAUTHORIZED,
    });
  }

  if (secretToken !== config.secret_token) {
    if (!retryCount[ip]) {
      retryCount[ip] = {count: 0};
    }

    retryCount[ip].count += 1;

    if (retryCount[ip].count >= 5) {
      if (!retryCount[ip].timeout) {
        retryCount[ip].timeout = setTimeout(() => {
          delete retryCount[ip];
        }, 30 * 1000);
      }
      return sendResponse(res, {
        statusCode: httpStatus.TOO_MANY_REQUESTS,
        success: false,
        message: REQUEST_MESSAGES.TOO_MANY_REQUESTS,
      });
    }

    return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: `${REQUEST_MESSAGES.FORBIDDEN} ${5 - retryCount[ip].count} retries left.`,
    });
  }

  if (retryCount[ip]) {
    clearTimeout(retryCount[ip].timeout);
    delete retryCount[ip];
  }

  next();
};

export {apiLimiter, apiSecretToken};
