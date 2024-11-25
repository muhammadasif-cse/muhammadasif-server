"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectValidation = void 0;
const zod_1 = require("zod");
const createProjectZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Project name is required",
        }),
        description: zod_1.z.string({
            required_error: "Project description is required",
        }),
        live: zod_1.z.string({
            required_error: "Project live URL is required",
        }),
        img: zod_1.z.string({
            required_error: "Project image URL is required",
        }),
        date: zod_1.z.string({
            required_error: "Project date is required",
        }),
        category: zod_1.z.string({
            required_error: "Project category is required",
        }),
        tags: zod_1.z.string({
            required_error: "Project tags are required",
        }),
        techstack: zod_1.z.string({
            required_error: "Project tech stack is required",
        }),
    }),
});
const updateProjectZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Project name is required",
        })
            .optional(),
        description: zod_1.z
            .string({
            required_error: "Project description is required",
        })
            .optional(),
        live: zod_1.z
            .string({
            required_error: "Project live URL is required",
        })
            .optional(),
        img: zod_1.z
            .string({
            required_error: "Project image URL is required",
        })
            .optional(),
        date: zod_1.z
            .string({
            required_error: "Project date is required",
        })
            .optional(),
        category: zod_1.z
            .string({
            required_error: "Project category is required",
        })
            .optional(),
        tags: zod_1.z
            .string({
            required_error: "Project tags are required",
        })
            .optional(),
        techstack: zod_1.z
            .string({
            required_error: "Project tech stack is required",
        })
            .optional(),
    }),
});
exports.ProjectValidation = {
    createProjectZodSchema,
    updateProjectZodSchema,
};
