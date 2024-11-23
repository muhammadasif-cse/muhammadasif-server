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
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    techstack: {
      type: Schema.Types.ObjectId,
      ref: "Techstack",
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
