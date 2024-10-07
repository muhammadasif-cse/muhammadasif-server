"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const cloudinary_model_1 = require("./cloudinary.model");
const cloudinary_1 = __importDefault(require("../../../config/cloudinary"));
const getAllCloudinary = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_1.default.api.resources();
    return result.resources;
});
const getSingleCloudinary = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_1.default.api.resource(id);
    return result;
});
const createCloudinary = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBase64 = payload.url.startsWith("data:image/");
    const imageUrl = isBase64 ? payload.url : `data:image/webp;base64,${payload.url}`;
    const result = yield cloudinary_1.default.uploader.upload(imageUrl, {
        upload_preset: "ml_default",
    });
    const image = new cloudinary_model_1.Cloudinary({
        url: result.secure_url,
        public_id: result.public_id,
    });
    yield image.save();
    return {
        url: result.secure_url,
        public_id: result.public_id,
    };
});
const deleteCloudinary = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_1.default.uploader.destroy(id);
    return result;
});
exports.CloudinaryService = {
    createCloudinary,
    getAllCloudinary,
    getSingleCloudinary,
    deleteCloudinary,
};
