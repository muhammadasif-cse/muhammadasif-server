import {Schema, model} from "mongoose";
import {IContact, ContactModel} from "./contact.interface";

const ContactSchema = new Schema<IContact, ContactModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    message: {
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

export const Contact = model<IContact, ContactModel>("Contact", ContactSchema);
