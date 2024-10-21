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
exports.CloudinaryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const cloudinary_service_1 = require("./cloudinary.service");
const cloudinary_constant_1 = require("./cloudinary.constant");
const pagination_1 = require("../../../constants/pagination");
const pick_1 = __importDefault(require("../../../shared/pick"));
const createCloudinary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cloudinary = __rest(req.body, []);
    if (!cloudinary) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: cloudinary_constant_1.REQUEST_MESSAGES.NOT_FOUND,
        });
    }
    const result = yield cloudinary_service_1.CloudinaryService.createCloudinary({ file: cloudinary.file });
    // Send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: cloudinary_constant_1.REQUEST_MESSAGES.CREATE,
        data: result,
    });
}));
const getAllCloudinary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, cloudinary_constant_1.cloudinaryFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield cloudinary_service_1.CloudinaryService.getAllCloudinary(filters, paginationOptions);
    //  send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: cloudinary_constant_1.REQUEST_MESSAGES.GET,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleCloudinary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield cloudinary_service_1.CloudinaryService.getSingleCloudinary(id);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: cloudinary_constant_1.REQUEST_MESSAGES.NOT_FOUND,
        });
    }
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: cloudinary_constant_1.REQUEST_MESSAGES.GET,
        data: result,
    });
}));
const updateCloudinary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    const result = yield cloudinary_service_1.CloudinaryService.updateCloudinary(id, updates);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: cloudinary_constant_1.REQUEST_MESSAGES.UPDATE,
        data: result,
    });
}));
const deleteCloudinary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, public_id } = req.body;
    const payload = { id, public_id };
    const result = yield cloudinary_service_1.CloudinaryService.deleteCloudinary(payload);
    if (result.result === "not found") {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: cloudinary_constant_1.REQUEST_MESSAGES.NOT_FOUND,
        });
    }
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: cloudinary_constant_1.REQUEST_MESSAGES.DELETE,
        data: result,
    });
}));
exports.CloudinaryController = {
    createCloudinary,
    getAllCloudinary,
    getSingleCloudinary,
    updateCloudinary,
    deleteCloudinary,
};
