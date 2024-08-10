"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialValidation = void 0;
const zod_1 = require("zod");
const createTestimonialZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Testimonial name is required",
        }),
        img: zod_1.z.string({
            required_error: "Testimonial img is required",
        }),
        review: zod_1.z.string({
            required_error: "Testimonial review is required",
        }),
        position: zod_1.z.string({
            required_error: "Testimonial position is required",
        }),
    }),
});
const updateTestimonialZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Testimonial name is required",
        })
            .optional(),
        img: zod_1.z
            .string({
            required_error: "Testimonial img is required",
        })
            .optional(),
        review: zod_1.z
            .string({
            required_error: "Testimonial review is required",
        })
            .optional(),
        position: zod_1.z
            .string({
            required_error: "Testimonial position is required",
        })
            .optional(),
    }),
});
exports.TestimonialValidation = {
    createTestimonialZodSchema,
    updateTestimonialZodSchema,
};
