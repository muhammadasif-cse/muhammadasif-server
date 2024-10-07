"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experience = void 0;
const mongoose_1 = require("mongoose");
const ExperienceSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Experience = (0, mongoose_1.model)("Experience", ExperienceSchema);
