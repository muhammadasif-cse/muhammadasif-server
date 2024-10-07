"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillValidation = void 0;
const zod_1 = require("zod");
const createSkillZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Skill name is required",
        }),
        icon: zod_1.z.string({
            required_error: "Skill icon is required",
        }),
    }),
});
const updateSkillZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Skill name is required",
        })
            .optional(),
        icon: zod_1.z
            .string({
            required_error: "Skill icon is required",
        })
            .optional(),
    }),
});
exports.SkillValidation = {
    createSkillZodSchema,
    updateSkillZodSchema,
};
