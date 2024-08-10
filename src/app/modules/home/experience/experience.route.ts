import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {ExperienceController} from "./experience.controller";
import {ExperienceValidation} from "./experience.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(ExperienceValidation.createExperienceZodSchema),
  ExperienceController.createExperience,
);
router.get("/:id", ExperienceController.getSingleExperience);
router.patch(
  "/:id",
  validateRequest(ExperienceValidation.updateExperienceZodSchema),
  ExperienceController.updateExperience,
);
router.delete("/:id", ExperienceController.deleteExperience);
router.get("/", ExperienceController.getAllExperience);

export const ExperienceRoutes = router;
