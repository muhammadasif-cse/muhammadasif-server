"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Achievement = void 0;
const mongoose_1 = require("mongoose");
const AchievementSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
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
exports.Achievement = (0, mongoose_1.model)("Achievement", AchievementSchema);
