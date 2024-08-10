"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactValidation = void 0;
const zod_1 = require("zod");
const createContactZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Contact name is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Contact email is required",
        })
            .email("Invalid email address"),
        number: zod_1.z.string({
            required_error: "Contact number is required",
        }),
        message: zod_1.z.string({
            required_error: "Contact message is required",
        }),
    }),
});
const updateContactZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .string({
            required_error: "Contact name is required",
        })
            .optional(),
        email: zod_1.z
            .string({
            required_error: "Contact email is required",
        })
            .email("Invalid email address")
            .optional(),
        number: zod_1.z
            .string({
            required_error: "Contact number is required",
        })
            .optional(),
        message: zod_1.z
            .string({
            required_error: "Contact message is required",
        })
            .optional(),
    })
        .strict(),
});
exports.ContactValidation = {
    createContactZodSchema,
    updateContactZodSchema,
};
