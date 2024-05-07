import {Model} from "mongoose";

export interface ILanding {
  name: string;
  content: string;
  img: string;
  link: string;
  linkName: string;
  title: string;
  titleHover: string;
  description: string;
  contact: string;
  whatsapp: string;
}

export type LandingModel = Model<ILanding, Record<string, unknown>>;

export interface ILandingFilters {
  searchTerm?: string;
  name?: string;
}
