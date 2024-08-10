import {Model} from "mongoose";

export interface ITestimonial {
  name: string;
  img: string;
  review: string;
  position: string;
}

export type TestimonialModel = Model<ITestimonial, Record<string, unknown>>;

export interface ITestimonialFilters {
  searchTerm?: string;
  name?: string;
  review?: string;
  position?: string;
}
