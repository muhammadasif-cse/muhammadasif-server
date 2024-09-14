import {Schema, model} from "mongoose";
import {IExperience, ExperienceModel} from "./experience.interface";

const ExperienceSchema = new Schema<IExperience, ExperienceModel>(
  {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
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
