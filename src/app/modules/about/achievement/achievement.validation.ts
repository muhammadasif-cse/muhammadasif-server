import {z} from "zod";

const createAchievementZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Achievement name is required",
    }),
    value: z.string({
      required_error: "Achievement value is required",
    }),
  }),
});
const updateAchievementZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Achievement name is required",
      })
      .optional(),
    value: z
      .string({
        required_error: "Achievement value is required",
      })
      .optional(),
  }),
});

export const AchievementValidation = {
  createAchievementZodSchema,
  updateAchievementZodSchema,
};
