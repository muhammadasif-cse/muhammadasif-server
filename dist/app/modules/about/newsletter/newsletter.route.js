"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const newsletter_validation_1 = require("./newsletter.validation");
const newsletter_controller_1 = require("./newsletter.controller");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.default)(newsletter_validation_1.NewsletterValidation.createNewsletterZodSchema), newsletter_controller_1.newsletterController.createNewsletter);
router.get("/:id", newsletter_controller_1.newsletterController.getSingleNewsletter);
router.patch("/:id", (0, validateRequest_1.default)(newsletter_validation_1.NewsletterValidation.updateNewsletterZodSchema), newsletter_controller_1.newsletterController.updateNewsletter);
router.delete("/:id", newsletter_controller_1.newsletterController.deleteNewsletter);
router.get("/", newsletter_controller_1.newsletterController.getAllNewsletter);
exports.NewsletterRoutes = router;
