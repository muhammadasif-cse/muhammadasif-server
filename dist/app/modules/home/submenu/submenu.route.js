"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmenuRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const submenu_controller_1 = require("./submenu.controller");
const submenu_validation_1 = require("./submenu.validation");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.default)(submenu_validation_1.SubmenuValidation.createSubmenuZodSchema), submenu_controller_1.SubmenuController.createSubmenu);
router.get("/:id", submenu_controller_1.SubmenuController.getSingleSubmenu);
router.patch("/:id", (0, validateRequest_1.default)(submenu_validation_1.SubmenuValidation.updateSubmenuZodSchema), submenu_controller_1.SubmenuController.updateSubmenu);
router.delete("/:id", submenu_controller_1.SubmenuController.deleteSubmenu);
router.get("/", submenu_controller_1.SubmenuController.getAllSubmenu);
exports.SubmenuRoutes = router;
