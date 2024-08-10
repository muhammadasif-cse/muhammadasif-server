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
exports.SubmenuService = void 0;
const paginationHelper_1 = require("../../../../helpers/paginationHelper");
const submenu_constant_1 = require("./submenu.constant");
const submenu_model_1 = require("./submenu.model");
const getAllSubmenu = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: submenu_constant_1.submenuSearchableFields.map((field) => ({
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
    const result = yield submenu_model_1.Submenu.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);
    const total = yield submenu_model_1.Submenu.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleSubmenu = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield submenu_model_1.Submenu.findById({ _id: id }).lean();
    return result;
});
const createSubmenu = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield submenu_model_1.Submenu.create(payload);
    return result;
});
const updateSubmenu = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield submenu_model_1.Submenu.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteSubmenu = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield submenu_model_1.Submenu.findByIdAndDelete({ _id: id });
    return result;
});
exports.SubmenuService = {
    createSubmenu,
    getAllSubmenu,
    getSingleSubmenu,
    updateSubmenu,
    deleteSubmenu,
};
