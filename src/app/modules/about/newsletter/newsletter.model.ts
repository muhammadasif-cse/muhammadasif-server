import {Schema, model} from "mongoose";
import {INewsletter, NewsletterModel} from "./newsletter.interface";

const NewsletterSchema = new Schema<INewsletter, NewsletterModel>(
  {
    email: {
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

export const Newsletter = model<INewsletter, NewsletterModel>("Newsletter", NewsletterSchema);
