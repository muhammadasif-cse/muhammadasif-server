import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {AchievementValidation} from "./achievement.validation";
import {AchievementController} from "./achievement.controller";

const router = express.Router();

router.post(
  "/create",
  validateRequest(AchievementValidation.createAchievementZodSchema),
  AchievementController.createAchievement,
);
router.get("/:id", AchievementController.getSingleAchievement);
router.patch(
  "/:id",
  validateRequest(AchievementValidation.updateAchievementZodSchema),
  AchievementController.updateAchievement,
);
router.delete("/:id", AchievementController.deleteAchievement);
router.get("/", AchievementController.getAllAchievement);

export const AchievementRoutes = router;
