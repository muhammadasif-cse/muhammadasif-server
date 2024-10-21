import {z} from "zod";

const createAboutMeZodSchema = z.object({
  body: z.object({
    firstContent: z.string({
      required_error: "About Me first content is required",
    }),
    middleContent: z.string({
      required_error: "About Me middle content is required",
    }),
    lastContent: z.string({
      required_error: "About Me last content is required",
    }),
  }),
});
const updateAboutMeZodSchema = z.object({
  body: z
    .object({
      firstContent: z
        .string({
          required_error: "About Me first content is required",
        })
        .optional(),
      middleContent: z.string({
        required_error: "About Me middle content is required",
      }),
      lastContent: z
        .string({
          required_error: "About Me last content is required",
        })
        .optional(),
    })
    .strict(),
});

export const AboutMeValidation = {
  createAboutMeZodSchema,
  updateAboutMeZodSchema,
};
