"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const achievement_validation_1 = require("./achievement.validation");
const achievement_controller_1 = require("./achievement.controller");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.default)(achievement_validation_1.AchievementValidation.createAchievementZodSchema), achievement_controller_1.AchievementController.createAchievement);
router.get("/:id", achievement_controller_1.AchievementController.getSingleAchievement);
router.patch("/:id", (0, validateRequest_1.default)(achievement_validation_1.AchievementValidation.updateAchievementZodSchema), achievement_controller_1.AchievementController.updateAchievement);
router.delete("/:id", achievement_controller_1.AchievementController.deleteAchievement);
router.get("/", achievement_controller_1.AchievementController.getAllAchievement);
exports.AchievementRoutes = router;
