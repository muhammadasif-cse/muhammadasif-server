"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate6digit = void 0;
const generate6digit = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};
exports.generate6digit = generate6digit;
