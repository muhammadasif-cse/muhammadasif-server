import {Model} from "mongoose";

export interface IProject {
  name: string;
  description: string;
  live: string;
  img: string;
}

export type ProjectModel = Model<IProject, Record<string, unknown>>;

export interface IProjectFilters {
  searchTerm?: string;
  name?: string;
  live?: string;
}
