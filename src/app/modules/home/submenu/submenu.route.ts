import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {SubmenuController} from "./submenu.controller";
import {SubmenuValidation} from "./submenu.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(SubmenuValidation.createSubmenuZodSchema),
  SubmenuController.createSubmenu,
);
router.get("/:id", SubmenuController.getSingleSubmenu);
router.patch(
  "/:id",
  validateRequest(SubmenuValidation.updateSubmenuZodSchema),
  SubmenuController.updateSubmenu,
);
router.delete("/:id", SubmenuController.deleteSubmenu);
router.get("/", SubmenuController.getAllSubmenu);

export const SubmenuRoutes = router;
