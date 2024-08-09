import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {SkillValidation} from "./skill.validation";
import {SkillController} from "./skill.controller";

const router = express.Router();

router.post(
  "/create",
  validateRequest(SkillValidation.createSkillZodSchema),
  SkillController.createSkill,
);
router.get("/:id", SkillController.getSingleSkill);
router.patch(
  "/:id",
  validateRequest(SkillValidation.updateSkillZodSchema),
  SkillController.updateSkill,
);
router.delete("/:id", SkillController.deleteSkill);
router.get("/", SkillController.getAllSkill);

export const SkillRoutes = router;
