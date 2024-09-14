import {Model} from "mongoose";

export interface IExperience {
  title: string;
  icon: string;
  date: string;
  details: string;
  url: string;
}

export type ExperienceModel = Model<IExperience, Record<string, unknown>>;

export interface IExperienceFilters {
  searchTerm?: string;
  title?: string;
}
