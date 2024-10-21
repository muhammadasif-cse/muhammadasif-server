"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryFilterableFields = exports.cloudinarySearchableFields = exports.REQUEST_MESSAGES = void 0;
exports.REQUEST_MESSAGES = {
    NOT_FOUND: "Sorry, image not found.",
    FORBIDDEN: "Invalid image access code.",
    CREATE: "Successfully uploaded image.",
    UPDATE: "Updated successfully.",
    DELETE: "Successfully deleted image.",
    GET: "Successfully retrieved image.",
};
exports.cloudinarySearchableFields = ["public_id"];
exports.cloudinaryFilterableFields = ["searchTerm", "url", "public_id"];
