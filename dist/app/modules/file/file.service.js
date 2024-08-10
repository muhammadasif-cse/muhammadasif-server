"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileService = void 0;
/* eslint-disable no-undef */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generate6digit_1 = require("../../../shared/generate6digit");
const files = [];
const requestUploadFile = (file) => {
    const code = (0, generate6digit_1.generate6digit)();
    const link = `http://localhost:5000/files/access/${file.filename}/${code}`;
    files.push({ filename: file.filename, code });
    return { link, code };
};
const requestDeleteFile = (filename) => {
    const filePath = path_1.default.join("uploads", filename);
    try {
        fs_1.default.unlinkSync(filePath);
        return true;
    }
    catch (error) {
        return false;
    }
};
const requestGetFileByCode = (filename, code) => {
    const file = files.find((f) => f.filename === filename && f.code === code);
    return file !== undefined;
};
const requestGetAllFiles = () => {
    return files;
};
exports.fileService = {
    requestUploadFile,
    requestDeleteFile,
    requestGetFileByCode,
    requestGetAllFiles,
};
