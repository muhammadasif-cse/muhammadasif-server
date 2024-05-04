import {Schema, model} from "mongoose";
import {ISubmenu, SubmenuModel} from "./submenu.interface";

const SubmenuSchema = new Schema<ISubmenu, SubmenuModel>(
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Submenu = model<ISubmenu, SubmenuModel>("Submenu", SubmenuSchema);
