import {Model} from "mongoose";

export interface IExperience {
  title: string;
  img: string;
  date: string;
  details: string;
}

export type ExperienceModel = Model<IExperience, Record<string, unknown>>;

export interface IExperienceFilters {
  searchTerm?: string;
  title?: string;
}
