"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationValidation = void 0;
const zod_1 = require("zod");
const createNavigationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Navigation name is required",
        }),
        url: zod_1.z.string({
            required_error: "Navigation url is required",
        }),
    }),
});
const updateNavigationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Navigation name is required",
        })
            .optional(),
        url: zod_1.z
            .string({
            required_error: "navigation url is required",
        })
            .optional(),
    }),
});
exports.NavigationValidation = {
    createNavigationZodSchema,
    updateNavigationZodSchema,
};
