import {Model, Types} from "mongoose";
import {ITechstack} from "../techstack/techstack.interface";

export interface IProject {
  name: string;
  description: string;
  live: string;
  img: string;
  date: Date;
  category: string;
  tags: string;
  techstack: Types.ObjectId | ITechstack;
}

export type ProjectModel = Model<IProject, Record<string, unknown>>;

export interface IProjectFilters {
  searchTerm?: string;
  name?: string;
  live?: string;
}
