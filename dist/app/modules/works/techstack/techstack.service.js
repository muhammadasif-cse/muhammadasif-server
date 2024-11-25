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
exports.TechstackService = void 0;
const paginationHelper_1 = require("../../../../helpers/paginationHelper");
const techstack_constant_1 = require("./techstack.constant");
const techstack_model_1 = require("./techstack.model");
const getAllTechstack = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: techstack_constant_1.techstackSearchableFields.map((field) => ({
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
    const result = yield techstack_model_1.Techstack.find(whereConditions)
        .sort(Object.assign(Object.assign({}, sortConditions), { createdAt: -1 }))
        .skip(skip)
        .limit(limit);
    const total = yield techstack_model_1.Techstack.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleTechstack = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield techstack_model_1.Techstack.findById({ _id: id }).lean();
    return result;
});
const createTechstack = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield techstack_model_1.Techstack.create(payload);
    return result;
});
const updateTechstack = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield techstack_model_1.Techstack.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteTechstack = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield techstack_model_1.Techstack.findByIdAndDelete({ _id: id });
    return result;
});
exports.TechstackService = {
    createTechstack,
    getAllTechstack,
    getSingleTechstack,
    updateTechstack,
    deleteTechstack,
};
