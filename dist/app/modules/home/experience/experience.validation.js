"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceValidation = void 0;
const zod_1 = require("zod");
const createExperienceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Experience name is required",
        }),
        img: zod_1.z.string({
            required_error: "Experience img is required",
        }),
        date: zod_1.z.string({
            required_error: "Experience date is required",
        }),
        details: zod_1.z.string({
            required_error: "Experience details is required",
        }),
    }),
});
const updateExperienceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: "Experience name is required",
        })
            .optional(),
        img: zod_1.z
            .string({
            required_error: "Experience img is required",
        })
            .optional(),
        date: zod_1.z
            .string({
            required_error: "Experience date is required",
        })
            .optional(),
        details: zod_1.z
            .string({
            required_error: "Experience details is required",
        })
            .optional(),
    }),
});
exports.ExperienceValidation = {
    createExperienceZodSchema,
    updateExperienceZodSchema,
};
