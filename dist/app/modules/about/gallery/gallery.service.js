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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryService = void 0;
const paginationHelper_1 = require("../../../../helpers/paginationHelper");
const gallery_constant_1 = require("./gallery.constant");
const gallery_model_1 = require("./gallery.model");
const getAllGallery = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: gallery_constant_1.gallerySearchableFields.map((field) => ({
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
    const result = yield gallery_model_1.Gallery.find(whereConditions)
        .sort(Object.assign(Object.assign({}, sortConditions), { createdAt: 1 }))
        .skip(skip)
        .limit(limit);
    const total = yield gallery_model_1.Gallery.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleGallery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gallery_model_1.Gallery.findById({ _id: id }).lean();
    return result;
});
const createGallery = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gallery_model_1.Gallery.create(payload);
    return result;
});
const updateGallery = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gallery_model_1.Gallery.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteGallery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gallery_model_1.Gallery.findByIdAndDelete({ _id: id });
    return result;
});
exports.GalleryService = {
    createGallery,
    getAllGallery,
    getSingleGallery,
    updateGallery,
    deleteGallery,
};
