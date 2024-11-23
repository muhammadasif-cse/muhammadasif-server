import express from "express";
import {TechstackController} from "./techstack.controller";

const router = express.Router();

router.post("/create", TechstackController.createTechstack);
router.get("/:id", TechstackController.getSingleTechstack);
router.patch("/:id", TechstackController.updateTechstack);
router.delete("/:id", TechstackController.deleteTechstack);
router.get("/", TechstackController.getAllTechstack);

export const TechstackRoutes = router;
