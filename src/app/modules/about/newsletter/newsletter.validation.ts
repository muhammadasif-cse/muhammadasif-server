import {z} from "zod";

const createNewsletterZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
  }),
});
const updateNewsletterZodSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Invalid email address")
        .optional(),
    })
    .strict(),
});

export const NewsletterValidation = {
  createNewsletterZodSchema,
  updateNewsletterZodSchema,
};
