import {z} from "zod";

const createSocialZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Social name is required",
    }),
    url: z.string({
      required_error: "Social url is required",
    }),
  }),
});
const updateSocialZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Social name is required",
      })
      .optional(),
    url: z
      .string({
        required_error: "Social url is required",
      })
      .optional(),
  }),
});

export const SocialValidation = {
  createSocialZodSchema,
  updateSocialZodSchema,
};
