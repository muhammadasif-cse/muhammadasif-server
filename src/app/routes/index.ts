import express from "express";
import {SocialRoutes} from "../modules/home/social/social.route";
import {SkillRoutes} from "../modules/home/skill/skill.route";
import {ExperienceRoutes} from "../modules/home/experience/experience.route";
import {TestimonialRoutes} from "../modules/home/testimonial/testimonial.route";
import {ContactRoutes} from "../modules/home/contact/contact.route";
import {CloudinaryRoutes} from "../modules/cloudinary/cloudinary.route";
import {FileUploadRoutes} from "../modules/file/file.route";
const router = express.Router();

const moduleRoutes = [
  {path: "/social", route: SocialRoutes},
  {path: "/skill", route: SkillRoutes},
  {path: "/experience", route: ExperienceRoutes},
  {path: "/testimonial", route: TestimonialRoutes},
  {path: "/contact", route: ContactRoutes},
  {path: "/file", route: FileUploadRoutes},
  {path: "/cloudinary", route: CloudinaryRoutes},
];

moduleRoutes.forEach(({path, route}) => router.use(path, route));

export default router;
