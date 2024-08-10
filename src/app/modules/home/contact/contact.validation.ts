import {z} from "zod";

const createContactZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Contact name is required",
    }),
    email: z
      .string({
        required_error: "Contact email is required",
      })
      .email("Invalid email address"),
    number: z.string({
      required_error: "Contact number is required",
    }),
    message: z.string({
      required_error: "Contact message is required",
    }),
  }),
});
const updateContactZodSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          required_error: "Contact name is required",
        })
        .optional(),
      email: z
        .string({
          required_error: "Contact email is required",
        })
        .email("Invalid email address")
        .optional(),
      number: z
        .string({
          required_error: "Contact number is required",
        })
        .optional(),
      message: z
        .string({
          required_error: "Contact message is required",
        })
        .optional(),
    })
    .strict(),
});

export const ContactValidation = {
  createContactZodSchema,
  updateContactZodSchema,
};
