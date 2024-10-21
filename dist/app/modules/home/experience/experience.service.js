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
exports.ExperienceService = void 0;
const paginationHelper_1 = require("../../../../helpers/paginationHelper");
const experience_constant_1 = require("./experience.constant");
const experience_model_1 = require("./experience.model");
const getAllExperience = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: experience_constant_1.experienceSearchableFields.map((field) => ({
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
    const result = yield experience_model_1.Experience.find(whereConditions)
        .sort(Object.assign(Object.assign({}, sortConditions), { createdAt: 1 }))
        .skip(skip)
        .limit(limit);
    const total = yield experience_model_1.Experience.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleExperience = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_model_1.Experience.findById({ _id: id }).lean();
    return result;
});
const createExperience = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_model_1.Experience.create(payload);
    return result;
});
const updateExperience = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_model_1.Experience.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteExperience = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_model_1.Experience.findByIdAndDelete({ _id: id });
    return result;
});
exports.ExperienceService = {
    createExperience,
    getAllExperience,
    getSingleExperience,
    updateExperience,
    deleteExperience,
};
