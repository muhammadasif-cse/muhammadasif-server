"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cloudinary_controller_1 = require("./cloudinary.controller");
const router = express_1.default.Router();
router.post("/create", cloudinary_controller_1.CloudinaryController.createCloudinary);
router.get("/:id", cloudinary_controller_1.CloudinaryController.getSingleCloudinary);
router.delete("/:id", cloudinary_controller_1.CloudinaryController.deleteCloudinary);
router.get("/", cloudinary_controller_1.CloudinaryController.getAllCloudinary);
exports.CloudinaryRoutes = router;
