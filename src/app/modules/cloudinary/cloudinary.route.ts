import express from "express";
import {CloudinaryController} from "./cloudinary.controller";

const router = express.Router();
router.post("/create", CloudinaryController.createCloudinary);
router.get("/:id", CloudinaryController.getSingleCloudinary);
router.delete("/", CloudinaryController.deleteCloudinary);
router.put("/:id", CloudinaryController.updateCloudinary);
router.get("/", CloudinaryController.getAllCloudinary);

export const CloudinaryRoutes = router;
