import {Model} from "mongoose";

export interface ISocial {
  name: string;
  url: string;
  icon: string;
}

export type SocialModel = Model<ISocial, Record<string, unknown>>;

export interface ISocialFilters {
  searchTerm?: string;
  name?: string;
}
