"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cloudinary = void 0;
const mongoose_1 = require("mongoose");
const CloudinarySchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    asset_id: { type: String },
    format: { type: String },
    version: { type: Number },
    resource_type: { type: String },
    type: { type: String },
    created_at: { type: String },
    bytes: { type: Number },
    width: { type: Number },
    height: { type: Number },
    folder: { type: String },
    secure_url: { type: String },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cloudinary = (0, mongoose_1.model)("Cloudinary", CloudinarySchema);
