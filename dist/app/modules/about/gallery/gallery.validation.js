"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryValidation = void 0;
const zod_1 = require("zod");
const createGalleryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        img: zod_1.z.string({
            required_error: "Gallery image is required",
        }),
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
    }),
});
const updateGalleryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        img: zod_1.z
            .string({
            required_error: "Gallery image is required",
        })
            .optional(),
        title: zod_1.z
            .string({
            required_error: "Title is required",
        })
            .optional(),
    }),
});
exports.GalleryValidation = {
    createGalleryZodSchema,
    updateGalleryZodSchema,
};
