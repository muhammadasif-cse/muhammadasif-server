"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Social = void 0;
const mongoose_1 = require("mongoose");
const SocialSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    icon: {
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
exports.Social = (0, mongoose_1.model)("Social", SocialSchema);
