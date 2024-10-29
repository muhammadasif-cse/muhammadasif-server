"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const gallery_validation_1 = require("./gallery.validation");
const gallery_controller_1 = require("./gallery.controller");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.default)(gallery_validation_1.GalleryValidation.createGalleryZodSchema), gallery_controller_1.GalleryController.createGallery);
router.get("/:id", gallery_controller_1.GalleryController.getSingleGallery);
router.patch("/:id", (0, validateRequest_1.default)(gallery_validation_1.GalleryValidation.updateGalleryZodSchema), gallery_controller_1.GalleryController.updateGallery);
router.delete("/:id", gallery_controller_1.GalleryController.deleteGallery);
router.get("/", gallery_controller_1.GalleryController.getAllGallery);
exports.GalleryRoutes = router;
