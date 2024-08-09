import {Model} from "mongoose";

export interface ISkill {
  name: string;
  img: string;
}

export type SkillModel = Model<ISkill, Record<string, unknown>>;

export interface ISkillFilters {
  searchTerm?: string;
  name?: string;
}
