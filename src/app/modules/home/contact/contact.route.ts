import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {ContactController} from "./contact.controller";
import {ContactValidation} from "./contact.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(ContactValidation.createContactZodSchema),
  ContactController.createContact,
);
router.get("/:id", ContactController.getSingleContact);
router.patch(
  "/:id",
  validateRequest(ContactValidation.updateContactZodSchema),
  ContactController.updateContact,
);
router.delete("/:id", ContactController.deleteContact);
router.get("/", ContactController.getAllContact);

export const ContactRoutes = router;
