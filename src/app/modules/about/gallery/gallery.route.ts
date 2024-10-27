import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {GalleryValidation} from "./gallery.validation";
import {GalleryController} from "./gallery.controller";

const router = express.Router();

router.post(
  "/create",
  validateRequest(GalleryValidation.createGalleryZodSchema),
  GalleryController.createGallery,
);
router.get("/:id", GalleryController.getSingleGallery);
router.patch(
  "/:id",
  validateRequest(GalleryValidation.updateGalleryZodSchema),
  GalleryController.updateGallery,
);
router.delete("/:id", GalleryController.deleteGallery);
router.get("/", GalleryController.getAllGallery);

export const GalleryRoutes = router;
