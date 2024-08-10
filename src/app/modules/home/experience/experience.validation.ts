import {z} from "zod";

const createExperienceZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Experience name is required",
    }),
    img: z.string({
      required_error: "Experience img is required",
    }),
    date: z.string({
      required_error: "Experience date is required",
    }),
    details: z.string({
      required_error: "Experience details is required",
    }),
  }),
});
const updateExperienceZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Experience name is required",
      })
      .optional(),
    img: z
      .string({
        required_error: "Experience img is required",
      })
      .optional(),
    date: z
      .string({
        required_error: "Experience date is required",
      })
      .optional(),
    details: z
      .string({
        required_error: "Experience details is required",
      })
      .optional(),
  }),
});

export const ExperienceValidation = {
  createExperienceZodSchema,
  updateExperienceZodSchema,
};
