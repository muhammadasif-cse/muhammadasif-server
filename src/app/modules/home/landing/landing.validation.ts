import {z} from "zod";

const createLandingZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Landing name is required",
    }),
    content: z.string({
      required_error: "Landing content is required",
    }),
    img: z.string({
      required_error: "Landing img is required",
    }),
    link: z.string({
      required_error: "Landing link is required",
    }),
    linkName: z.string({
      required_error: "Landing linkName is required",
    }),
    title: z.string({
      required_error: "Landing title is required",
    }),
    titleHover: z.string({
      required_error: "Landing titleHover is required",
    }),
    description: z.string({
      required_error: "Landing description is required",
    }),
    contact: z.string({
      required_error: "Landing contact is required",
    }),
    whatsapp: z.string({
      required_error: "Landing whatsapp is required",
    }),
  }),
});
const updateLandingZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Landing name is required",
      })
      .optional(),
    content: z
      .string({
        required_error: "Landing content is required",
      })
      .optional(),
    img: z
      .string({
        required_error: "Landing img is required",
      })
      .optional(),
    link: z
      .string({
        required_error: "Landing link is required",
      })
      .optional(),
    linkName: z
      .string({
        required_error: "Landing linkName is required",
      })
      .optional(),
    title: z
      .string({
        required_error: "Landing title is required",
      })
      .optional(),
    titleHover: z
      .string({
        required_error: "Landing titleHover is required",
      })
      .optional(),
    description: z
      .string({
        required_error: "Landing description is required",
      })
      .optional(),
    contact: z
      .string({
        required_error: "Landing contact is required",
      })
      .optional(),
    whatsapp: z

      .string({
        required_error: "Landing whatsapp is required",
      })
      .optional(),
  }),
});

export const LandingValidation = {
  createLandingZodSchema,
  updateLandingZodSchema,
};
