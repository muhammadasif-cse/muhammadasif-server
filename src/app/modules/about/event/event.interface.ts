import {Model} from "mongoose";

export interface IEvent {
  images: string[];
  title: string;
  category: string;
  date: string;
  topContent: string;
  firstContent: string;
  middleContent: string;
  endContent: string;
  imgText: string;
  tags: string;
}

export type EventModel = Model<IEvent, Record<string, unknown>>;

export interface IEventFilters {
  searchTerm?: string;
  title?: string;
  date?: string;
  tags?: string;
}
