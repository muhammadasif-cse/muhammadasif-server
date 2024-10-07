import {Schema, model} from "mongoose";
import {CloudinaryModel, ICloudinary} from "./cloudinary.interface";

const CloudinarySchema = new Schema<ICloudinary, CloudinaryModel>(
  {
    url: {type: String, required: true},
    public_id: {type: String, required: true},
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Cloudinary = model<ICloudinary, CloudinaryModel>("Cloudinary", CloudinarySchema);
