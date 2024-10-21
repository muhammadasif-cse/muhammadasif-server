"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterValidation = void 0;
const zod_1 = require("zod");
const createNewsletterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email address"),
    }),
});
const updateNewsletterZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email address")
            .optional(),
    })
        .strict(),
});
exports.NewsletterValidation = {
    createNewsletterZodSchema,
    updateNewsletterZodSchema,
};
