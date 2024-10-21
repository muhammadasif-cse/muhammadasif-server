"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutMe = void 0;
const mongoose_1 = require("mongoose");
const AboutMeSchema = new mongoose_1.Schema({
    firstContent: {
        type: String,
        required: true,
        unique: true,
    },
    middleContent: {
        type: String,
        required: true,
        unique: true,
    },
    lastContent: {
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
exports.AboutMe = (0, mongoose_1.model)("AboutMe", AboutMeSchema);
