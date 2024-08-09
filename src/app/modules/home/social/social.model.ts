import {Schema, model} from "mongoose";
import {ISocial, SocialModel} from "./social.interface";

const SocialSchema = new Schema<ISocial, SocialModel>(
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
    icon: {
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

export const Social = model<ISocial, SocialModel>("Social", SocialSchema);
