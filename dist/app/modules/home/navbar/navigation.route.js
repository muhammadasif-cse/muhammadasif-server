"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const navigation_controller_1 = require("./navigation.controller");
const navigation_validation_1 = require("./navigation.validation");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.default)(navigation_validation_1.NavigationValidation.createNavigationZodSchema), navigation_controller_1.NavigationController.createNavigation);
router.get("/:id", navigation_controller_1.NavigationController.getSingleNavigation);
router.patch("/:id", (0, validateRequest_1.default)(navigation_validation_1.NavigationValidation.updateNavigationZodSchema), navigation_controller_1.NavigationController.updateNavigation);
router.delete("/:id", navigation_controller_1.NavigationController.deleteNavigation);
router.get("/", navigation_controller_1.NavigationController.getAllNavigation);
exports.NavigationRoutes = router;
