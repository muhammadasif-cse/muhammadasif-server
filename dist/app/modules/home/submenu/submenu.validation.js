"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmenuValidation = void 0;
const zod_1 = require("zod");
const createSubmenuZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        menu: zod_1.z.string({
            required_error: "Submenu menu is required",
        }),
        name: zod_1.z.string({
            required_error: "Submenu name is required",
        }),
        url: zod_1.z.string({
            required_error: "Submenu url is required",
        }),
    }),
});
const updateSubmenuZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        menu: zod_1.z
            .string({
            required_error: "Submenu menu is required",
        })
            .optional(),
        name: zod_1.z
            .string({
            required_error: "Submenu name is required",
        })
            .optional(),
        url: zod_1.z
            .string({
            required_error: "Submenu url is required",
        })
            .optional(),
    }),
});
exports.SubmenuValidation = {
    createSubmenuZodSchema,
    updateSubmenuZodSchema,
};
