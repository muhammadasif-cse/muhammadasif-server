import {Model} from "mongoose";

export interface ISkill {
  name: string;
  icon: string;
}

export type SkillModel = Model<ISkill, Record<string, unknown>>;

export interface ISkillFilters {
  searchTerm?: string;
  name?: string;
}
