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
      required_error: "Project live is required",
    }),
    img: z.string({
      required_error: "Project image is required",
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
        required_error: "Project live is required",
      })
      .optional(),
    img: z
      .string({
        required_error: "Project image is required",
      })
      .optional(),
  }),
});

export const ProjectValidation = {
  createProjectZodSchema,
  updateProjectZodSchema,
};
