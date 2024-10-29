"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const event_controller_1 = require("./event.controller");
const event_validation_1 = require("./event.validation");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.default)(event_validation_1.EventValidation.createEventZodSchema), event_controller_1.EventController.createEvent);
router.get("/:id", event_controller_1.EventController.getSingleEvent);
router.patch("/:id", (0, validateRequest_1.default)(event_validation_1.EventValidation.updateEventZodSchema), event_controller_1.EventController.updateEvent);
router.delete("/:id", event_controller_1.EventController.deleteEvent);
router.get("/", event_controller_1.EventController.getAllEvent);
exports.EventRoutes = router;
