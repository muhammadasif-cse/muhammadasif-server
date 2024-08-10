"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
const mongoose_1 = require("mongoose");
const NavigationSchema = new mongoose_1.Schema({
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
    submenu: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Submenu",
        required: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Navigation = (0, mongoose_1.model)("Navigation", NavigationSchema);
