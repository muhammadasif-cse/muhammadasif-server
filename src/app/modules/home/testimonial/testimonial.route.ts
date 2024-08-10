import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {TestimonialController} from "./testimonial.controller";
import {TestimonialValidation} from "./testimonial.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(TestimonialValidation.createTestimonialZodSchema),
  TestimonialController.createTestimonial,
);
router.get("/:id", TestimonialController.getSingleTestimonial);
router.patch(
  "/:id",
  validateRequest(TestimonialValidation.updateTestimonialZodSchema),
  TestimonialController.updateTestimonial,
);
router.delete("/:id", TestimonialController.deleteTestimonial);
router.get("/", TestimonialController.getAllTestimonial);

export const TestimonialRoutes = router;
