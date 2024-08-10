import {Schema, model} from "mongoose";
import {ITestimonial, TestimonialModel} from "./testimonial.interface";

const TestimonialSchema = new Schema<ITestimonial, TestimonialModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: true,
      unique: true,
    },
    review: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
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

export const Testimonial = model<ITestimonial, TestimonialModel>("Testimonial", TestimonialSchema);
