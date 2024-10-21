import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import {NewsletterValidation} from "./newsletter.validation";
import {newsletterController} from "./newsletter.controller";

const router = express.Router();

router.post(
  "/create",
  validateRequest(NewsletterValidation.createNewsletterZodSchema),
  newsletterController.createNewsletter,
);
router.get("/:id", newsletterController.getSingleNewsletter);
router.patch(
  "/:id",
  validateRequest(NewsletterValidation.updateNewsletterZodSchema),
  newsletterController.updateNewsletter,
);
router.delete("/:id", newsletterController.deleteNewsletter);
router.get("/", newsletterController.getAllNewsletter);

export const NewsletterRoutes = router;
