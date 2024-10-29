"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    title: {
        unique: true,
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    topContent: {
        type: String,
        required: true,
    },
    firstContent: {
        type: String,
        required: true,
    },
    middleContent: {
        type: String,
        required: true,
    },
    endContent: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    imgText: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Event = (0, mongoose_1.model)("Event", EventSchema);
