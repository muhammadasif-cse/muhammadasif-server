import {Schema, model} from "mongoose";
import {EventModel, IEvent} from "./event.interface";

const EventSchema = new Schema<IEvent, EventModel>(
  {
    title: {
      unique: true,
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    topContent: {
      type: String,
      required: true,
    },
    firstContent: {
      type: String,
      required: true,
    },
    middleContent: {
      type: String,
      required: true,
    },
    endContent: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    imgText: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Event = model<IEvent, EventModel>("Event", EventSchema);
