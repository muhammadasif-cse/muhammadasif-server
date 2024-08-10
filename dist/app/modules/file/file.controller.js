"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const path_1 = __importDefault(require("path"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const file_constant_1 = require("./file.constant");
const file_service_1 = require("./file.service");
const requestUploadFile = (req, res) => {
    if (!req.file) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: file_constant_1.REQUEST_MESSAGES.NOT_FOUND,
            data: req.file,
        });
        return;
    }
    const result = file_service_1.fileService.requestUploadFile(req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: file_constant_1.REQUEST_MESSAGES.CREATE,
        data: result,
    });
};
const requestDeleteFile = (req, res) => {
    const { filename } = req.params;
    if (file_service_1.fileService.requestDeleteFile(filename)) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: file_constant_1.REQUEST_MESSAGES.DELETE,
            data: filename,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: true,
            message: file_constant_1.REQUEST_MESSAGES.NOT_FOUND,
            data: null,
        });
    }
};
const requestGetFileByCode = (req, res) => {
    const { filename, code } = req.params;
    if (file_service_1.fileService.requestGetFileByCode(filename, code)) {
        const filePath = path_1.default.resolve("uploads", filename);
        res.sendFile(filePath, (err) => {
            if (err) {
                if (!res.headersSent) {
                    (0, sendResponse_1.default)(res, {
                        statusCode: http_status_1.default.NOT_FOUND,
                        success: false,
                        message: file_constant_1.REQUEST_MESSAGES.NOT_FOUND,
                        data: null,
                    });
                }
            }
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.FORBIDDEN,
            success: false,
            message: file_constant_1.REQUEST_MESSAGES.FORBIDDEN,
            data: null,
        });
    }
};
const requestGetAllFiles = (req, res) => {
    const files = file_service_1.fileService.requestGetAllFiles();
    const filesWithLinks = files.map((file) => ({
        filename: file.filename,
        link: `http://localhost:5000/files/${file.filename}`,
    }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: file_constant_1.REQUEST_MESSAGES.GET,
        data: filesWithLinks,
    });
};
exports.fileController = {
    requestUploadFile,
    requestDeleteFile,
    requestGetFileByCode,
    requestGetAllFiles,
};
