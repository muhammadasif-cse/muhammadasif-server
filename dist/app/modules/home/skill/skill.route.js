"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const skill_validation_1 = require("./skill.validation");
const skill_controller_1 = require("./skill.controller");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.default)(skill_validation_1.SkillValidation.createSkillZodSchema), skill_controller_1.SkillController.createSkill);
router.get("/:id", skill_controller_1.SkillController.getSingleSkill);
router.patch("/:id", (0, validateRequest_1.default)(skill_validation_1.SkillValidation.updateSkillZodSchema), skill_controller_1.SkillController.updateSkill);
router.delete("/:id", skill_controller_1.SkillController.deleteSkill);
router.get("/", skill_controller_1.SkillController.getAllSkill);
exports.SkillRoutes = router;
