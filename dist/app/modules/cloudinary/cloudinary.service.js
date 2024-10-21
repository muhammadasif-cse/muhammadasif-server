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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const cloudinary_model_1 = require("./cloudinary.model");
const cloudinary_1 = __importDefault(require("../../../config/cloudinary"));
const cloudinary_constant_1 = require("./cloudinary.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const getAllCloudinary = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cloudinary_constant_1.cloudinarySearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, sortBy, sortOrder, skip } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cloudinary_model_1.Cloudinary.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cloudinary_model_1.Cloudinary.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCloudinary = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_model_1.Cloudinary.findById({ _id: id }).lean();
    return result;
});
const createCloudinary = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.file) {
        throw new Error("File is required to upload this");
    }
    const isBase64 = payload.file.startsWith("data:image/");
    const imageUrl = isBase64 ? payload.file : `data:image/webp;base64,${payload.file}`;
    const cloudinaryResult = yield cloudinary_1.default.uploader.upload(imageUrl, {
        upload_preset: "ml_default",
    });
    const cloudinaryAssets = {
        url: cloudinaryResult.secure_url,
        public_id: cloudinaryResult.public_id,
        resource_type: cloudinaryResult.resource_type,
        type: cloudinaryResult.type,
        created_at: cloudinaryResult.created_at,
    };
    const image = new cloudinary_model_1.Cloudinary(cloudinaryAssets);
    const result = yield image.save();
    return result;
});
const updateCloudinary = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.public_id) {
        throw new Error("public_id is required to update Cloudinary asset");
    }
    // NOTE:=> Delete the previous asset from Cloudinary
    const cloudinaryDelete = yield cloudinary_1.default.uploader.destroy(payload.public_id);
    // NOTE:=> If asset not found in Cloudinary
    if (cloudinaryDelete.result !== "ok") {
        throw new Error("This asset not found");
    }
    else {
        // NOTE:=> Check if file is provided to update the asset
        if (!payload.file) {
            throw new Error("file is required to update Cloudinary asset");
        }
        const isBase64 = payload.file.startsWith("data:image/");
        const imageUrl = isBase64 ? payload.file : `data:image/webp;base64,${payload.file}`;
        // NOTE:=> Upload the new asset to Cloudinary
        const cloudinaryResult = yield cloudinary_1.default.uploader.upload(imageUrl, {
            upload_preset: "ml_default",
        });
        // NOTE:=> Update the asset in the database
        const cloudinaryAssets = {
            url: cloudinaryResult.secure_url,
            public_id: cloudinaryResult.public_id,
            resource_type: cloudinaryResult.resource_type,
            type: cloudinaryResult.type,
            created_at: cloudinaryResult.created_at,
        };
        // NOTE:=> Update the asset in the database
        const result = yield cloudinary_model_1.Cloudinary.findOneAndUpdate({ _id: id }, cloudinaryAssets, {
            new: true,
        });
        return result;
    }
});
const deleteCloudinary = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const cloudinaryDelete = yield cloudinary_1.default.uploader.destroy(payload.public_id);
    if (cloudinaryDelete.result !== "ok") {
        throw new Error("This image is not found in the cloudinary");
    }
    else {
        const result = yield cloudinary_model_1.Cloudinary.findByIdAndDelete({ _id: payload.id });
        if (!result) {
            throw new Error("This image is not found in the database");
        }
        return result;
    }
});
exports.CloudinaryService = {
    createCloudinary,
    getAllCloudinary,
    getSingleCloudinary,
    updateCloudinary,
    deleteCloudinary,
};
