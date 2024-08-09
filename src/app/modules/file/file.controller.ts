import {Request, Response} from "express";
import httpStatus from "http-status";
import path from "path";
import sendResponse from "../../../shared/sendResponse";
import {REQUEST_MESSAGES} from "./file.constant";
import {fileService} from "./file.service";
import {TFileUpload} from "./file.type";

const requestUploadFile = (req: Request, res: Response): void => {
  if (!req.file) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: REQUEST_MESSAGES.NOT_FOUND,
      data: req.file,
    });
    return;
  }
  const result = fileService.requestUploadFile(req.file);
  sendResponse<TFileUpload>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: REQUEST_MESSAGES.CREATE,
    data: result,
  });
};

const requestDeleteFile = (req: Request, res: Response): void => {
  const {filename} = req.params;

  if (fileService.requestDeleteFile(filename)) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: REQUEST_MESSAGES.DELETE,
      data: filename,
    });
  } else {
    sendResponse<TFileUpload>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: true,
      message: REQUEST_MESSAGES.NOT_FOUND,
      data: null,
    });
  }
};

const requestGetFileByCode = (req: Request, res: Response): void => {
  const {filename, code} = req.params;

  if (fileService.requestGetFileByCode(filename, code)) {
    const filePath = path.resolve("uploads", filename);

    res.sendFile(filePath, (err) => {
      if (err) {
        if (!res.headersSent) {
          sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: REQUEST_MESSAGES.NOT_FOUND,
            data: null,
          });
        }
      }
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: REQUEST_MESSAGES.FORBIDDEN,
      data: null,
    });
  }
};
const requestGetAllFiles = (req: Request, res: Response): void => {
  const files = fileService.requestGetAllFiles();
  const filesWithLinks = files.map((file) => ({
    filename: file.filename,
    link: `http://localhost:5000/files/${file.filename}`,
  }));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: REQUEST_MESSAGES.GET,
    data: filesWithLinks,
  });
};

export const fileController = {
  requestUploadFile,
  requestDeleteFile,
  requestGetFileByCode,
  requestGetAllFiles,
};
