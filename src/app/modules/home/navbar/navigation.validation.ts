import {z} from "zod";

const createNavigationZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Navigation name is required",
    }),
    url: z.string({
      required_error: "Navigation url is required",
    }),
  }),
});
const updateNavigationZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Navigation name is required",
      })
      .optional(),
    url: z
      .string({
        required_error: "navigation url is required",
      })
      .optional(),
  }),
});

export const NavigationValidation = {
  createNavigationZodSchema,
  updateNavigationZodSchema,
};
