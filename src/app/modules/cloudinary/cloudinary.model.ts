import {Schema, model} from "mongoose";
import {CloudinaryModel, ICloudinary} from "./cloudinary.interface";

const CloudinarySchema = new Schema<ICloudinary, CloudinaryModel>(
  {
    url: {type: String, required: true},
    public_id: {type: String, required: true},
    asset_id: {type: String},
    format: {type: String},
    version: {type: Number},
    resource_type: {type: String},
    type: {type: String},
    created_at: {type: String},
    bytes: {type: Number},
    width: {type: Number},
    height: {type: Number},
    folder: {type: String},
    secure_url: {type: String},
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Cloudinary = model<ICloudinary, CloudinaryModel>("Cloudinary", CloudinarySchema);
