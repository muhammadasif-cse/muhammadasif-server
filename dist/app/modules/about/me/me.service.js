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
exports.aboutMeService = void 0;
const paginationHelper_1 = require("../../../../helpers/paginationHelper");
const me_constant_1 = require("./me.constant");
const me_model_1 = require("./me.model");
const getAllAboutMe = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: me_constant_1.aboutMeSearchableFields.map((field) => ({
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
    const result = yield me_model_1.AboutMe.find(whereConditions)
        .sort(Object.assign(Object.assign({}, sortConditions), { createdAt: 1 }))
        .skip(skip)
        .limit(limit);
    const total = yield me_model_1.AboutMe.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleAboutMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield me_model_1.AboutMe.findById({ _id: id }).lean();
    return result;
});
const createAboutMe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield me_model_1.AboutMe.create(payload);
    return result;
});
const updateAboutMe = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield me_model_1.AboutMe.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteAboutMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield me_model_1.AboutMe.findByIdAndDelete({ _id: id });
    return result;
});
exports.aboutMeService = {
    createAboutMe,
    getAllAboutMe,
    getSingleAboutMe,
    updateAboutMe,
    deleteAboutMe,
};
