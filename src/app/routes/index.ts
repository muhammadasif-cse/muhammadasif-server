import express from "express";
import {AchievementRoutes} from "../modules/about/achievement/achievement.route";
import {EventRoutes} from "../modules/about/event/event.route";
import {GalleryRoutes} from "../modules/about/gallery/gallery.route";
import {AboutMeRoutes} from "../modules/about/me/me.route";
import {NewsletterRoutes} from "../modules/about/newsletter/newsletter.route";
import {CloudinaryRoutes} from "../modules/cloudinary/cloudinary.route";
import {FileUploadRoutes} from "../modules/file/file.route";
import {ContactRoutes} from "../modules/home/contact/contact.route";
import {ExperienceRoutes} from "../modules/home/experience/experience.route";
import {SkillRoutes} from "../modules/home/skill/skill.route";
import {SocialRoutes} from "../modules/home/social/social.route";
import {TestimonialRoutes} from "../modules/home/testimonial/testimonial.route";
const router = express.Router();

const moduleRoutes = [
  {path: "/social", route: SocialRoutes},
  {path: "/skill", route: SkillRoutes},
  {path: "/experience", route: ExperienceRoutes},
  {path: "/testimonial", route: TestimonialRoutes},
  {path: "/contact", route: ContactRoutes},
  {path: "/file", route: FileUploadRoutes},
  {path: "/cloudinary", route: CloudinaryRoutes},
  {path: "/about/me", route: AboutMeRoutes},
  {path: "/about/achievement", route: AchievementRoutes},
  {path: "/newsletter", route: NewsletterRoutes},
  {path: "/gallery", route: GalleryRoutes},
  {path: "/event", route: EventRoutes},
];

moduleRoutes.forEach(({path, route}) => router.use(path, route));

export default router;
