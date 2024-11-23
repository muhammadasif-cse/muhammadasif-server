import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {ProjectController} from "./project.controller";
import {ProjectValidation} from "./project.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(ProjectValidation.createProjectZodSchema),
  ProjectController.createProject,
);
router.get("/:id", ProjectController.getSingleProject);
router.patch(
  "/:id",
  validateRequest(ProjectValidation.updateProjectZodSchema),
  ProjectController.updateProject,
);
router.delete("/:id", ProjectController.deleteProject);
router.get("/", ProjectController.getAllProject);

export const ProjectRoutes = router;
