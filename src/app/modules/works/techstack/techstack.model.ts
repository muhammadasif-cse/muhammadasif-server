import {Schema, model} from "mongoose";
import {ITechstack, TechstackModel} from "./techstack.interface";

const TechstackSchema = new Schema<ITechstack, TechstackModel>(
  {},
  {
    strict: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Techstack = model<ITechstack, TechstackModel>("Techstack", TechstackSchema);
