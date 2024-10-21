import {Schema, model} from "mongoose";
import {AchievementModel, IAchievement} from "./achievement.interface";

const AchievementSchema = new Schema<IAchievement, AchievementModel>(
  {
    content: {
      type: String,
      required: true,
      unique: true,
    },
    experience: {
      type: String,
      required: true,
      unique: true,
    },
    projects: {
      type: String,
      required: true,
      unique: true,
    },
    satisfy: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Achievement = model<IAchievement, AchievementModel>("Achievement", AchievementSchema);
