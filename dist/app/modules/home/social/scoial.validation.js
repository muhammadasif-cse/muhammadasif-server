"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialValidation = void 0;
const zod_1 = require("zod");
const createSocialZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Social name is required",
        }),
        url: zod_1.z.string({
            required_error: "Social url is required",
        }),
        icon: zod_1.z.string({
            required_error: "Social icon is required",
        }),
    }),
});
const updateSocialZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Social name is required",
        })
            .optional(),
        url: zod_1.z
            .string({
            required_error: "Social url is required",
        })
            .optional(),
        icon: zod_1.z
            .string({
            required_error: "Social icon is required",
        })
            .optional(),
    }),
});
exports.SocialValidation = {
    createSocialZodSchema,
    updateSocialZodSchema,
};
