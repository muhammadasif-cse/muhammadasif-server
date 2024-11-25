"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechstackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const techstack_controller_1 = require("./techstack.controller");
const router = express_1.default.Router();
router.post("/create", techstack_controller_1.TechstackController.createTechstack);
router.get("/:id", techstack_controller_1.TechstackController.getSingleTechstack);
router.patch("/:id", techstack_controller_1.TechstackController.updateTechstack);
router.delete("/:id", techstack_controller_1.TechstackController.deleteTechstack);
router.get("/", techstack_controller_1.TechstackController.getAllTechstack);
exports.TechstackRoutes = router;
