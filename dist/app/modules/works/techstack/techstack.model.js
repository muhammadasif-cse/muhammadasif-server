"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Techstack = void 0;
const mongoose_1 = require("mongoose");
const TechstackSchema = new mongoose_1.Schema({}, {
    strict: false,
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Techstack = (0, mongoose_1.model)("Techstack", TechstackSchema);
