import {Model} from "mongoose";

export interface IAchievement {
  content: string;
  satisfy: string;
  projects: string;
  experience: string;
}

export type AchievementModel = Model<IAchievement, Record<string, unknown>>;

export interface IAchievementFilters {
  searchTerm?: string;
  satisfy?: string;
  projects?: string;
  experience?: string;
}
