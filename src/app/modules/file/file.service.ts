/* eslint-disable no-undef */
import fs from "fs";
import path from "path";
import {TFileData} from "./file.type";
import {generate6digit} from "../../../shared/generate6digit";

const files: TFileData[] = [];

const requestUploadFile = (file: Express.Multer.File): {link: string; code: string} => {
  const code = generate6digit();
  const link = `http://localhost:5000/files/access/${file.filename}/${code}`;

  files.push({filename: file.filename, code});

  return {link, code};
};

const requestDeleteFile = (filename: string): boolean => {
  const filePath = path.join("uploads", filename);
  try {
    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    return false;
  }
};

const requestGetFileByCode = (filename: string, code: string): boolean => {
  const file = files.find((f) => f.filename === filename && f.code === code);
  return file !== undefined;
};
const requestGetAllFiles = (): TFileData[] => {
  return files;
};
export const fileService = {
  requestUploadFile,
  requestDeleteFile,
  requestGetFileByCode,
  requestGetAllFiles,
};
