"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidation = void 0;
const zod_1 = require("zod");
const createEventZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Event title is required",
        }),
        category: zod_1.z.string({
            required_error: "Event category is required",
        }),
        date: zod_1.z.string({
            required_error: "Event date is required",
        }),
        topContent: zod_1.z.string({
            required_error: "Event top content is required",
        }),
        firstContent: zod_1.z.string({
            required_error: "Event first content is required",
        }),
        middleContent: zod_1.z.string({
            required_error: "Event middle content is required",
        }),
        endContent: zod_1.z.string({
            required_error: "Event end content is required",
        }),
        images: zod_1.z
            .array(zod_1.z.string({
            required_error: "Event images is required",
        }))
            .nonempty({
            message: "Event images does not allow empty array",
        }),
        imgText: zod_1.z.string({
            required_error: "Event image text is required",
        }),
        tags: zod_1.z.string({
            required_error: "Event tags is required",
        }),
    }),
});
const updateEventZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: "Event title is required",
        })
            .optional(),
        category: zod_1.z
            .string({
            required_error: "Event category is required",
        })
            .optional(),
        date: zod_1.z
            .string({
            required_error: "Event date is required",
        })
            .optional(),
        topContent: zod_1.z
            .string({
            required_error: "Event top content is required",
        })
            .optional(),
        firstContent: zod_1.z
            .string({
            required_error: "Event first content is required",
        })
            .optional(),
        middleContent: zod_1.z
            .string({
            required_error: "Event middle content is required",
        })
            .optional(),
        endContent: zod_1.z
            .string({
            required_error: "Event end content is required",
        })
            .optional(),
        images: zod_1.z
            .array(zod_1.z
            .string({
            required_error: "Event images is required",
        })
            .optional())
            .nonempty({
            message: "Event images does not allow empty array",
        }),
        imgText: zod_1.z
            .string({
            required_error: "Event image text is required",
        })
            .optional(),
        tags: zod_1.z
            .string({
            required_error: "Event tags is required",
        })
            .optional(),
    }),
});
exports.EventValidation = {
    createEventZodSchema,
    updateEventZodSchema,
};
