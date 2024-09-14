import {z} from "zod";

const createExperienceZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Experience name is required",
    }),
    icon: z.string({
      required_error: "Experience icon is required",
    }),
    date: z.string({
      required_error: "Experience date is required",
    }),
    details: z.string({
      required_error: "Experience details is required",
    }),
    url: z.string({
      required_error: "Experience company url is required",
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
    icon: z
      .string({
        required_error: "Experience icon is required",
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
    url: z
      .string({
        required_error: "Experience company url is required",
      })
      .optional(),
  }),
});

export const ExperienceValidation = {
  createExperienceZodSchema,
  updateExperienceZodSchema,
};
