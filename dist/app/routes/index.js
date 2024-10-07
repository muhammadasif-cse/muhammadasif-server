"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const social_route_1 = require("../modules/home/social/social.route");
const skill_route_1 = require("../modules/home/skill/skill.route");
const experience_route_1 = require("../modules/home/experience/experience.route");
const testimonial_route_1 = require("../modules/home/testimonial/testimonial.route");
const contact_route_1 = require("../modules/home/contact/contact.route");
const cloudinary_route_1 = require("../modules/cloudinary/cloudinary.route");
const file_route_1 = require("../modules/file/file.route");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: "/social", route: social_route_1.SocialRoutes },
    { path: "/skill", route: skill_route_1.SkillRoutes },
    { path: "/experience", route: experience_route_1.ExperienceRoutes },
    { path: "/testimonial", route: testimonial_route_1.TestimonialRoutes },
    { path: "/contact", route: contact_route_1.ContactRoutes },
    { path: "/file", route: file_route_1.FileUploadRoutes },
    { path: "/cloudinary", route: cloudinary_route_1.CloudinaryRoutes },
];
moduleRoutes.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
