"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const scoial_validation_1 = require("./scoial.validation");
const social_controller_1 = require("./social.controller");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.default)(scoial_validation_1.SocialValidation.createSocialZodSchema), social_controller_1.SocialController.createSocial);
router.get("/:id", social_controller_1.SocialController.getSingleSocial);
router.patch("/:id", (0, validateRequest_1.default)(scoial_validation_1.SocialValidation.updateSocialZodSchema), social_controller_1.SocialController.updateSocial);
router.delete("/:id", social_controller_1.SocialController.deleteSocial);
router.get("/", social_controller_1.SocialController.getAllSocial);
exports.SocialRoutes = router;
