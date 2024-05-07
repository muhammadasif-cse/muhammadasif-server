import {Schema, model} from "mongoose";
import {ILanding, LandingModel} from "./landing.interface";

const LandingSchema = new Schema<ILanding, LandingModel>(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    linkName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    titleHover: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    whatsapp: {
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

export const Landing = model<ILanding, LandingModel>("Landing", LandingSchema);
