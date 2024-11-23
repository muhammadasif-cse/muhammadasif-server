import {Schema, model} from "mongoose";
import {IProject, ProjectModel} from "./project.interface";

const ProjectSchema = new Schema<IProject, ProjectModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    live: {
      unique: true,
      type: String,
      required: true,
    },
    img: {
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

export const Project = model<IProject, ProjectModel>("Project", ProjectSchema);
