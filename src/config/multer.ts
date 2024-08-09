import {NextFunction, Request, Response} from "express";
import multer from "multer";
import path from "path";
import {v4 as uuidv4} from "uuid";
import sendResponse from "../shared/sendResponse";
import httpStatus from "http-status";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});
const upload = multer({
  storage,
  // maximum file upload size 1 MB
  limits: {fileSize: 1 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    // Check file type
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      cb(null, true);
    } else {
      // Reject file
      cb(new Error("Sorry, invalid file type. Only JPEG, JPG, and PNG files are allowed."));
    }
  },
});

// Error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "File size exceeds the limit. Maximum file size allowed is 1MB.",
      });
    }
  } else if (err) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: err.message,
    });
  }
  next();
};

export {upload, errorHandler};

export default upload;
