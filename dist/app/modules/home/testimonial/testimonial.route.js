"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const testimonial_controller_1 = require("./testimonial.controller");
const testimonial_validation_1 = require("./testimonial.validation");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.default)(testimonial_validation_1.TestimonialValidation.createTestimonialZodSchema), testimonial_controller_1.TestimonialController.createTestimonial);
router.get("/:id", testimonial_controller_1.TestimonialController.getSingleTestimonial);
router.patch("/:id", (0, validateRequest_1.default)(testimonial_validation_1.TestimonialValidation.updateTestimonialZodSchema), testimonial_controller_1.TestimonialController.updateTestimonial);
router.delete("/:id", testimonial_controller_1.TestimonialController.deleteTestimonial);
router.get("/", testimonial_controller_1.TestimonialController.getAllTestimonial);
exports.TestimonialRoutes = router;
