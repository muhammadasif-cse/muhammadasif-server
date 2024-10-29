import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {EventController} from "./event.controller";
import {EventValidation} from "./event.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(EventValidation.createEventZodSchema),
  EventController.createEvent,
);
router.get("/:id", EventController.getSingleEvent);
router.patch(
  "/:id",
  validateRequest(EventValidation.updateEventZodSchema),
  EventController.updateEvent,
);
router.delete("/:id", EventController.deleteEvent);
router.get("/", EventController.getAllEvent);

export const EventRoutes = router;
