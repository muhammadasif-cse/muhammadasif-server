import express from "express";
import {NavigationRoutes} from "../modules/home/navbar/navigation.route";
import {SubmenuRoutes} from "../modules/home/submenu/submenu.route";
const router = express.Router();

const moduleRoutes = [
  {path: "/navigation", route: NavigationRoutes},
  {path: "/submenu", route: SubmenuRoutes},
];

moduleRoutes.forEach(({path, route}) => router.use(path, route));

export default router;
