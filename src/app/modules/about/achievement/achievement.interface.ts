import {Model} from "mongoose";

export interface IAchievement {
  name: string;
  value: string;
}

export type AchievementModel = Model<IAchievement, Record<string, unknown>>;

export interface IAchievementFilters {
  searchTerm?: string;
  name?: string;
  value?: string;
}
