"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Submenu = void 0;
const mongoose_1 = require("mongoose");
const SubmenuSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Submenu = (0, mongoose_1.model)("Submenu", SubmenuSchema);
