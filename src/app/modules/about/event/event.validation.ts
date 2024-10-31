import {z} from "zod";

const createEventZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Event title is required",
    }),
    category: z.string({
      required_error: "Event category is required",
    }),
    date: z.string({
      required_error: "Event date is required",
    }),
    topContent: z.string({
      required_error: "Event top content is required",
    }),
    firstContent: z.string({
      required_error: "Event first content is required",
    }),
    middleContent: z.string({
      required_error: "Event middle content is required",
    }),
    endContent: z.string({
      required_error: "Event end content is required",
    }),
    images: z
      .array(
        z.string({
          required_error: "Event images is required",
        }),
      )
      .nonempty({
        message: "Event images does not allow empty array",
      }),
    imgText: z.string({
      required_error: "Event image text is required",
    }),
    tags: z.string({
      required_error: "Event tags is required",
    }),
  }),
});
const updateEventZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Event title is required",
      })
      .optional(),
    category: z
      .string({
        required_error: "Event category is required",
      })
      .optional(),
    date: z
      .string({
        required_error: "Event date is required",
      })
      .optional(),
    topContent: z
      .string({
        required_error: "Event top content is required",
      })
      .optional(),
    firstContent: z
      .string({
        required_error: "Event first content is required",
      })
      .optional(),
    middleContent: z
      .string({
        required_error: "Event middle content is required",
      })
      .optional(),
    endContent: z
      .string({
        required_error: "Event end content is required",
      })
      .optional(),
    images: z
      .array(
        z
          .string({
            required_error: "Event images is required",
          })
          .optional(),
      )
      .nonempty({
        message: "Event images does not allow empty array",
      })
      .optional(),
    imgText: z
      .string({
        required_error: "Event image text is required",
      })
      .optional(),
    tags: z
      .string({
        required_error: "Event tags is required",
      })
      .optional(),
  }),
});

export const EventValidation = {
  createEventZodSchema,
  updateEventZodSchema,
};
