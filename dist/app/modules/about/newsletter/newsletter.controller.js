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
exports.newsletterController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../../shared/sendResponse"));
const newsletter_service_1 = require("./newsletter.service");
const newsletter_constant_1 = require("./newsletter.constant");
const createNewsletter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Newsletter = __rest(req.body, []);
    // create Newsletter
    const result = yield newsletter_service_1.newsletterService.createNewsletter(Newsletter);
    //  send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully subscribe my newsletter.",
        data: result,
    });
}));
const getAllNewsletter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, newsletter_constant_1.newsletterFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield newsletter_service_1.newsletterService.getAllNewsletter(filters, paginationOptions);
    //  send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Newsletter fetched successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleNewsletter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield newsletter_service_1.newsletterService.getSingleNewsletter(id);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single Newsletter fetch successfully",
        data: result,
    });
}));
const updateNewsletter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const academicFaculty = __rest(req.body, []);
    const result = yield newsletter_service_1.newsletterService.updateNewsletter(id, academicFaculty);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Newsletter updated successfully.",
        data: result,
    });
}));
const deleteNewsletter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield newsletter_service_1.newsletterService.deleteNewsletter(id);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Newsletter deleted successfully.",
        data: result,
    });
}));
exports.newsletterController = {
    createNewsletter,
    getAllNewsletter,
    getSingleNewsletter,
    updateNewsletter,
    deleteNewsletter,
};
