"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutMeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const me_validation_1 = require("./me.validation");
const me_controller_1 = require("./me.controller");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.default)(me_validation_1.AboutMeValidation.createAboutMeZodSchema), me_controller_1.AboutMeController.createAboutMe);
router.get("/:id", me_controller_1.AboutMeController.getSingleAboutMe);
router.patch("/:id", (0, validateRequest_1.default)(me_validation_1.AboutMeValidation.updateAboutMeZodSchema), me_controller_1.AboutMeController.updateAboutMe);
router.delete("/:id", me_controller_1.AboutMeController.deleteAboutMe);
router.get("/", me_controller_1.AboutMeController.getAllAboutMe);
exports.AboutMeRoutes = router;
