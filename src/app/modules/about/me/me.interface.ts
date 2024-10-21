import {Model} from "mongoose";

export interface IAboutMe {
  firstContent: string;
  middleContent: string;
  lastContent: string;
}

export type AboutMeModel = Model<IAboutMe, Record<string, unknown>>;

export interface IAboutMeFilters {
  searchTerm?: string;
  firstContent?: string;
}
