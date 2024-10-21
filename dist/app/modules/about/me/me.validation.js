"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutMeValidation = void 0;
const zod_1 = require("zod");
const createAboutMeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstContent: zod_1.z.string({
            required_error: "About Me first content is required",
        }),
        middleContent: zod_1.z.string({
            required_error: "About Me middle content is required",
        }),
        lastContent: zod_1.z.string({
            required_error: "About Me last content is required",
        }),
    }),
});
const updateAboutMeZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        firstContent: zod_1.z
            .string({
            required_error: "About Me first content is required",
        })
            .optional(),
        middleContent: zod_1.z.string({
            required_error: "About Me middle content is required",
        }),
        lastContent: zod_1.z
            .string({
            required_error: "About Me last content is required",
        })
            .optional(),
    })
        .strict(),
});
exports.AboutMeValidation = {
    createAboutMeZodSchema,
    updateAboutMeZodSchema,
};
