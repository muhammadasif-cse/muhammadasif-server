import {z} from "zod";

const createProjectZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Project name is required",
    }),
    description: z.string({
      required_error: "Project description is required",
    }),
    live: z.string({
      required_error: "Project live URL is required",
    }),
    img: z.string({
      required_error: "Project image URL is required",
    }),
    date: z.string({
      required_error: "Project date is required",
    }),
    category: z.string({
      required_error: "Project category is required",
    }),
    tags: z.string({
      required_error: "Project tags are required",
    }),
    techstack: z.string({
      required_error: "Project tech stack is required",
    }),
  }),
});

const updateProjectZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Project name is required",
      })
      .optional(),
    description: z
      .string({
        required_error: "Project description is required",
      })
      .optional(),
    live: z
      .string({
        required_error: "Project live URL is required",
      })
      .optional(),
    img: z
      .string({
        required_error: "Project image URL is required",
      })
      .optional(),
    date: z
      .string({
        required_error: "Project date is required",
      })
      .optional(),
    category: z
      .string({
        required_error: "Project category is required",
      })
      .optional(),
    tags: z
      .string({
        required_error: "Project tags are required",
      })
      .optional(),
    techstack: z
      .string({
        required_error: "Project tech stack is required",
      })
      .optional(),
  }),
});

export const ProjectValidation = {
  createProjectZodSchema,
  updateProjectZodSchema,
};
