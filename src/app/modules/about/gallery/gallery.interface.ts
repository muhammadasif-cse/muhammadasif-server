import {Model} from "mongoose";

export interface IGallery {
  title: string;
  img: string;
  description: string;
  tags: string;
}

export type GalleryModel = Model<IGallery, Record<string, unknown>>;

export interface IGalleryFilters {
  searchTerm?: string;
  title?: string;
}
