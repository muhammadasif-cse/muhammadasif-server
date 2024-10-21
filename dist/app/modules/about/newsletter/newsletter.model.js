"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Newsletter = void 0;
const mongoose_1 = require("mongoose");
const NewsletterSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Newsletter = (0, mongoose_1.model)("Newsletter", NewsletterSchema);
