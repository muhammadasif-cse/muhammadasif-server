import {Model, Types} from "mongoose";
import {ISubmenu} from "../submenu/submenu.interface";

export interface INavigation {
  name: string;
  url: string;
  submenu?: Types.ObjectId | ISubmenu;
}

export type NavigationModel = Model<INavigation, Record<string, unknown>>;

export interface INavigationFilters {
  searchTerm?: string;
  name?: string;
}
