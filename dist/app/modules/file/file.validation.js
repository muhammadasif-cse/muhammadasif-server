"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileValidation = void 0;
const zod_1 = require("zod");
const createFileZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        file: zod_1.z
            .instanceof(File)
            .refine((file) => file.size <= 1000000, {
            message: "File size should be less than 1MB",
        })
            .refine((file) => file.type.includes("image"), {
            message: "File type should be an image",
        }),
    }),
});
exports.fileValidation = {
    createFileZodSchema,
};
