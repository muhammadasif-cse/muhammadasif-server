import {Schema, model} from "mongoose";
import {GalleryModel, IGallery} from "./gallery.interface";

const GallerySchema = new Schema<IGallery, GalleryModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
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

export const Gallery = model<IGallery, GalleryModel>("Gallery", GallerySchema);
