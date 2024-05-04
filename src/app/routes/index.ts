import express from "express";
import {NavigationRoutes} from "../modules/home/navbar/navigation.route";
import {SocialRoutes} from "../modules/home/social/social.route";
import {SubmenuRoutes} from "../modules/home/submenu/submenu.route";
const router = express.Router();

const moduleRoutes = [
  {path: "/navigation", route: NavigationRoutes},
  {path: "/submenu", route: SubmenuRoutes},
  {path: "/social", route: SocialRoutes},
];

moduleRoutes.forEach(({path, route}) => router.use(path, route));

export default router;
