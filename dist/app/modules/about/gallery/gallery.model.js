"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = void 0;
const mongoose_1 = require("mongoose");
const GallerySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    tags: {
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
exports.Gallery = (0, mongoose_1.model)("Gallery", GallerySchema);
