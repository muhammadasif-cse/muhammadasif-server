import express from "express";
import {fileController} from "./file.controller";
import upload, {errorHandler} from "../../../config/multer";

const router = express.Router();
router.post("/upload", upload.single("file"), errorHandler, fileController.requestUploadFile);
router.delete("/remove/:filename", fileController.requestDeleteFile);
router.get("/access/:filename/:code", fileController.requestGetFileByCode);
router.get("/all", fileController.requestGetAllFiles);

export const FileUploadRoutes = router;
