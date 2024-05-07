import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {LandingController} from "./landing.controller";
import {LandingValidation} from "./landing.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(LandingValidation.createLandingZodSchema),
  LandingController.createLanding,
);
router.get("/:id", LandingController.getSingleLanding);
router.patch(
  "/:id",
  validateRequest(LandingValidation.updateLandingZodSchema),
  LandingController.updateLanding,
);
router.delete("/:id", LandingController.deleteLanding);
router.get("/", LandingController.getAllLanding);

export const LandingRoutes = router;
