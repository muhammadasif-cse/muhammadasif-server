import {Model} from "mongoose";

export interface INewsletter {
  email: string;
}

export type NewsletterModel = Model<INewsletter, Record<string, unknown>>;

export interface INewsletterFilters {
  searchTerm?: string;
  email?: string;
}
