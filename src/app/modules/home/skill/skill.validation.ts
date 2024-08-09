import {z} from "zod";

const createSkillZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Skill name is required",
    }),
    img: z.string({
      required_error: "Skill img is required",
    }),
  }),
});
const updateSkillZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Skill name is required",
      })
      .optional(),
    img: z
      .string({
        required_error: "Skill icon is required",
      })
      .optional(),
  }),
});

export const SkillValidation = {
  createSkillZodSchema,
  updateSkillZodSchema,
};
