import {z} from "zod";

const createTestimonialZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Testimonial name is required",
    }),
    img: z.string({
      required_error: "Testimonial img is required",
    }),
    review: z.string({
      required_error: "Testimonial review is required",
    }),
    position: z.string({
      required_error: "Testimonial position is required",
    }),
  }),
});
const updateTestimonialZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Testimonial name is required",
      })
      .optional(),
    img: z
      .string({
        required_error: "Testimonial img is required",
      })
      .optional(),
    review: z
      .string({
        required_error: "Testimonial review is required",
      })
      .optional(),
    position: z
      .string({
        required_error: "Testimonial position is required",
      })
      .optional(),
  }),
});

export const TestimonialValidation = {
  createTestimonialZodSchema,
  updateTestimonialZodSchema,
};
