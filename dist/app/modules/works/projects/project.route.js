"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const project_controller_1 = require("./project.controller");
const project_validation_1 = require("./project.validation");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.default)(project_validation_1.ProjectValidation.createProjectZodSchema), project_controller_1.ProjectController.createProject);
router.get("/:id", project_controller_1.ProjectController.getSingleProject);
router.patch("/:id", (0, validateRequest_1.default)(project_validation_1.ProjectValidation.updateProjectZodSchema), project_controller_1.ProjectController.updateProject);
router.delete("/:id", project_controller_1.ProjectController.deleteProject);
router.get("/", project_controller_1.ProjectController.getAllProject);
exports.ProjectRoutes = router;
