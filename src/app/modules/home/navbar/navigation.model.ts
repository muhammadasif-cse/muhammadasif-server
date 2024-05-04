import {Schema, model} from "mongoose";
import {INavigation, NavigationModel} from "./navigation.interface";

const NavigationSchema = new Schema<INavigation, NavigationModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    submenu: {
      type: Schema.Types.ObjectId,
      ref: "submenu",
      required: true,
    },
    social: {
      type: Schema.Types.ObjectId,
      ref: "social",
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

export const Navigation = model<INavigation, NavigationModel>("Navigation", NavigationSchema);
