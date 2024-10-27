import {z} from "zod";

const createGalleryZodSchema = z.object({
  body: z.object({
    img: z.string({
      required_error: "Gallery image is required",
    }),
    title: z.string({
      required_error: "Title is required",
    }),
  }),
});
const updateGalleryZodSchema = z.object({
  body: z.object({
    img: z
      .string({
        required_error: "Gallery image is required",
      })
      .optional(),
    title: z
      .string({
        required_error: "Title is required",
      })
      .optional(),
  }),
});

export const GalleryValidation = {
  createGalleryZodSchema,
  updateGalleryZodSchema,
};
