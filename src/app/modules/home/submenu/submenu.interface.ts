import {Model} from "mongoose";

export interface ISubmenu {
  name: string;
  url: string;
}

export type SubmenuModel = Model<ISubmenu, Record<string, unknown>>;

export interface ISubmenuFilters {
  searchTerm?: string;
  name?: string;
}
