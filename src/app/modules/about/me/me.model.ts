import {Schema, model} from "mongoose";
import {AboutMeModel, IAboutMe} from "./me.interface";

const AboutMeSchema = new Schema<IAboutMe, AboutMeModel>(
  {
    firstContent: {
      type: String,
      required: true,
      unique: true,
    },
    middleContent: {
      type: String,
      required: true,
      unique: true,
    },
    lastContent: {
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

export const AboutMe = model<IAboutMe, AboutMeModel>("AboutMe", AboutMeSchema);
