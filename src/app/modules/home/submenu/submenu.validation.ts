import {z} from "zod";

const createSubmenuZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Submenu name is required",
    }),
    url: z.string({
      required_error: "Submenu url is required",
    }),
  }),
});
const updateSubmenuZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Submenu name is required",
      })
      .optional(),
    url: z
      .string({
        required_error: "Submenu url is required",
      })
      .optional(),
  }),
});

export const SubmenuValidation = {
  createSubmenuZodSchema,
  updateSubmenuZodSchema,
};
