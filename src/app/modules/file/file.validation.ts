import {z} from "zod";

const createFileZodSchema = z.object({
  body: z.object({
    file: z
      .instanceof(File)
      .refine((file) => file.size <= 1000000, {
        message: "File size should be less than 1MB",
      })
      .refine((file) => file.type.includes("image"), {
        message: "File type should be an image",
      }),
  }),
});

export const fileValidation = {
  createFileZodSchema,
};
