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
exports.SocialController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../../shared/sendResponse"));
const social_constant_1 = require("./social.constant");
const social_service_1 = require("./social.service");
const createSocial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Social = __rest(req.body, []);
    // create Social
    const result = yield social_service_1.SocialService.createSocial(Social);
    //  send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Social create successfully.",
        data: result,
    });
}));
const getAllSocial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, social_constant_1.socialFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield social_service_1.SocialService.getAllSocial(filters, paginationOptions);
    //  send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Social fetched successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleSocial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield social_service_1.SocialService.getSingleSocial(id);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single Social fetch successfully",
        data: result,
    });
}));
const updateSocial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const academicFaculty = __rest(req.body, []);
    const result = yield social_service_1.SocialService.updateSocial(id, academicFaculty);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Social updated successfully.",
        data: result,
    });
}));
const deleteSocial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield social_service_1.SocialService.deleteSocial(id);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Social deleted successfully.",
        data: result,
    });
}));
exports.SocialController = {
    createSocial,
    getAllSocial,
    getSingleSocial,
    updateSocial,
    deleteSocial,
};
