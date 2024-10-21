"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementValidation = void 0;
const zod_1 = require("zod");
const createAchievementZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Achievement name is required",
        }),
        value: zod_1.z.string({
            required_error: "Achievement value is required",
        }),
    }),
});
const updateAchievementZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Achievement name is required",
        })
            .optional(),
        value: zod_1.z
            .string({
            required_error: "Achievement value is required",
        })
            .optional(),
    }),
});
exports.AchievementValidation = {
    createAchievementZodSchema,
    updateAchievementZodSchema,
};
