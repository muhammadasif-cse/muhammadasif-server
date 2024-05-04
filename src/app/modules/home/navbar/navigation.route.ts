import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {NavigationController} from "./navigation.controller";
import {NavigationValidation} from "./navigation.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(NavigationValidation.createNavigationZodSchema),
  NavigationController.createNavigation,
);
router.get("/:id", NavigationController.getSingleNavigation);
router.patch(
  "/:id",
  validateRequest(NavigationValidation.updateNavigationZodSchema),
  NavigationController.updateNavigation,
);
router.delete("/:id", NavigationController.deleteNavigation);
router.get("/", NavigationController.getAllNavigation);

export const NavigationRoutes = router;
