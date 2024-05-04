import {Model} from "mongoose";
import {ISocial} from "../social/social.interface";
import {ISubmenu} from "../submenu/submenu.interface";

export interface INavigation {
  name: string;
  url: string;
  submenu: ISubmenu[];
  social: ISocial[];
}

export type NavigationModel = Model<INavigation, Record<string, unknown>>;

export interface INavigationFilters {
  searchTerm?: string;
  name?: string;
}
