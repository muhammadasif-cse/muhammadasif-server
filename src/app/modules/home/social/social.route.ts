import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {SocialValidation} from "./scoial.validation";
import {SocialController} from "./social.controller";

const router = express.Router();

router.post(
  "/create",
  validateRequest(SocialValidation.createSocialZodSchema),
  SocialController.createSocial,
);
router.get("/:id", SocialController.getSingleSocial);
router.patch(
  "/:id",
  validateRequest(SocialValidation.updateSocialZodSchema),
  SocialController.updateSocial,
);
router.delete("/:id", SocialController.deleteSocial);
router.get("/", SocialController.getAllSocial);

export const SocialRoutes = router;
