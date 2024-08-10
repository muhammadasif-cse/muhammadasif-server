import {Model} from "mongoose";

export interface IContact {
  name: string;
  email: string;
  number: string;
  message: string;
}

export type ContactModel = Model<IContact, Record<string, unknown>>;

export interface IContactFilters {
  searchTerm?: string;
  name?: string;
  email?: string;
  number?: string;
  message?: string;
}
