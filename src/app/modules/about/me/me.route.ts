import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {AboutMeValidation} from "./me.validation";
import {AboutMeController} from "./me.controller";

const router = express.Router();

router.post(
  "/create",
  validateRequest(AboutMeValidation.createAboutMeZodSchema),
  AboutMeController.createAboutMe,
);
router.get("/:id", AboutMeController.getSingleAboutMe);
router.patch(
  "/:id",
  validateRequest(AboutMeValidation.updateAboutMeZodSchema),
  AboutMeController.updateAboutMe,
);
router.delete("/:id", AboutMeController.deleteAboutMe);
router.get("/", AboutMeController.getAllAboutMe);

export const AboutMeRoutes = router;
