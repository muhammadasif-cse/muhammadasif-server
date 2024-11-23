import {Model} from "mongoose";

export interface ITechstack {
  [key: string]: string;
}

export type TechstackModel = Model<ITechstack, Record<string, unknown>>;

export interface ITechstackFilters {
  searchTerm?: string;
  techstack?: string;
}
