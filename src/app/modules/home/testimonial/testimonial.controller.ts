import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {TestimonialService} from "./testimonial.service";
import {ITestimonial} from "./testimonial.interface";
import {testimonialFilterableFields} from "./testimonial.constant";

const createTestimonial = catchAsync(async (req: Request, res: Response) => {
  const {...Testimonial} = req.body;
  // create Testimonial
  const result = await TestimonialService.createTestimonial(Testimonial);

  //  send response
  sendResponse<ITestimonial>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonial create successfully.",
    data: result,
  });
});
const getAllTestimonial = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, testimonialFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await TestimonialService.getAllTestimonial(filters, paginationOptions);
  //  send response
  sendResponse<ITestimonial[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonial fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleTestimonial = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await TestimonialService.getSingleTestimonial(id);

  // send response
  sendResponse<ITestimonial>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Testimonial fetch successfully",
    data: result,
  });
});
const updateTestimonial = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await TestimonialService.updateTestimonial(id, academicFaculty);

  // send response
  sendResponse<ITestimonial>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonial updated successfully.",
    data: result,
  });
});
const deleteTestimonial = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await TestimonialService.deleteTestimonial(id);

  // send response
  sendResponse<ITestimonial>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonial deleted successfully.",
    data: result,
  });
});

export const TestimonialController = {
  createTestimonial,
  getAllTestimonial,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
