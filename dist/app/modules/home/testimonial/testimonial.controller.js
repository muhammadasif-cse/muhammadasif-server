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
exports.TestimonialController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../../shared/sendResponse"));
const testimonial_service_1 = require("./testimonial.service");
const testimonial_constant_1 = require("./testimonial.constant");
const createTestimonial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Testimonial = __rest(req.body, []);
    // create Testimonial
    const result = yield testimonial_service_1.TestimonialService.createTestimonial(Testimonial);
    //  send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Testimonial create successfully.",
        data: result,
    });
}));
const getAllTestimonial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, testimonial_constant_1.testimonialFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield testimonial_service_1.TestimonialService.getAllTestimonial(filters, paginationOptions);
    //  send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Testimonial fetched successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleTestimonial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield testimonial_service_1.TestimonialService.getSingleTestimonial(id);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single Testimonial fetch successfully",
        data: result,
    });
}));
const updateTestimonial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const academicFaculty = __rest(req.body, []);
    const result = yield testimonial_service_1.TestimonialService.updateTestimonial(id, academicFaculty);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Testimonial updated successfully.",
        data: result,
    });
}));
const deleteTestimonial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield testimonial_service_1.TestimonialService.deleteTestimonial(id);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Testimonial deleted successfully.",
        data: result,
    });
}));
exports.TestimonialController = {
    createTestimonial,
    getAllTestimonial,
    getSingleTestimonial,
    updateTestimonial,
    deleteTestimonial,
};
