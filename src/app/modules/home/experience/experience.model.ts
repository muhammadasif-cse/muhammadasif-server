import {Schema, model} from "mongoose";
import {IExperience, ExperienceModel} from "./experience.interface";

const ExperienceSchema = new Schema<IExperience, ExperienceModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      required: true,
      unique: true,
    },
    details: {
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

export const Experience = model<IExperience, ExperienceModel>("Experience", ExperienceSchema);
