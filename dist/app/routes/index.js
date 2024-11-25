"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const achievement_route_1 = require("../modules/about/achievement/achievement.route");
const event_route_1 = require("../modules/about/event/event.route");
const gallery_route_1 = require("../modules/about/gallery/gallery.route");
const me_route_1 = require("../modules/about/me/me.route");
const newsletter_route_1 = require("../modules/about/newsletter/newsletter.route");
const cloudinary_route_1 = require("../modules/cloudinary/cloudinary.route");
const file_route_1 = require("../modules/file/file.route");
const contact_route_1 = require("../modules/home/contact/contact.route");
const experience_route_1 = require("../modules/home/experience/experience.route");
const skill_route_1 = require("../modules/home/skill/skill.route");
const social_route_1 = require("../modules/home/social/social.route");
const testimonial_route_1 = require("../modules/home/testimonial/testimonial.route");
const project_route_1 = require("../modules/works/projects/project.route");
const techstack_route_1 = require("../modules/works/techstack/techstack.route");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: "/social", route: social_route_1.SocialRoutes },
    { path: "/skill", route: skill_route_1.SkillRoutes },
    { path: "/experience", route: experience_route_1.ExperienceRoutes },
    { path: "/testimonial", route: testimonial_route_1.TestimonialRoutes },
    { path: "/contact", route: contact_route_1.ContactRoutes },
    { path: "/file", route: file_route_1.FileUploadRoutes },
    { path: "/cloudinary", route: cloudinary_route_1.CloudinaryRoutes },
    { path: "/about/me", route: me_route_1.AboutMeRoutes },
    { path: "/about/achievement", route: achievement_route_1.AchievementRoutes },
    { path: "/newsletter", route: newsletter_route_1.NewsletterRoutes },
    { path: "/gallery", route: gallery_route_1.GalleryRoutes },
    { path: "/event", route: event_route_1.EventRoutes },
    { path: "/projects", route: project_route_1.ProjectRoutes },
    { path: "/techstack", route: techstack_route_1.TechstackRoutes },
];
moduleRoutes.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
