"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const experience_controller_1 = require("./experience.controller");
const experience_validation_1 = require("./experience.validation");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.default)(experience_validation_1.ExperienceValidation.createExperienceZodSchema), experience_controller_1.ExperienceController.createExperience);
router.get("/:id", experience_controller_1.ExperienceController.getSingleExperience);
router.patch("/:id", (0, validateRequest_1.default)(experience_validation_1.ExperienceValidation.updateExperienceZodSchema), experience_controller_1.ExperienceController.updateExperience);
router.delete("/:id", experience_controller_1.ExperienceController.deleteExperience);
router.get("/", experience_controller_1.ExperienceController.getAllExperience);
exports.ExperienceRoutes = router;
