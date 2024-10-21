import {Schema, model} from "mongoose";
import {AchievementModel, IAchievement} from "./achievement.interface";

const AchievementSchema = new Schema<IAchievement, AchievementModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
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
