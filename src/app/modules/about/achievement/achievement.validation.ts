import {z} from "zod";

const createAchievementZodSchema = z.object({
  body: z.object({
    content: z.string({
      required_error: "Achievement content is required",
    }),
    satisfy: z.string({
      required_error: "Achievement satisfy is required",
    }),
    projects: z.string({
      required_error: "Achievement projects is required",
    }),
    experience: z.string({
      required_error: "Achievement experience is required",
    }),
  }),
});
const updateAchievementZodSchema = z.object({
  body: z.object({
    content: z
      .string({
        required_error: "Achievement content is required",
      })
      .optional(),
    satisfy: z
      .string({
        required_error: "Achievement satisfy is required",
      })
      .optional(),
    projects: z
      .string({
        required_error: "Achievement projects is required",
      })
      .optional(),
    experience: z
      .string({
        required_error: "Achievement experience is required",
      })
      .optional(),
  }),
});

export const AchievementValidation = {
  createAchievementZodSchema,
  updateAchievementZodSchema,
};
