import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {newsletterService} from "./newsletter.service";
import {INewsletter} from "./newsletter.interface";
import {newsletterFilterableFields} from "./newsletter.constant";

const createNewsletter = catchAsync(async (req: Request, res: Response) => {
  const {...Newsletter} = req.body;
  // create Newsletter
  const result = await newsletterService.createNewsletter(Newsletter);

  //  send response
  sendResponse<INewsletter>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully subscribe my newsletter.",
    data: result,
  });
});
const getAllNewsletter = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, newsletterFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await newsletterService.getAllNewsletter(filters, paginationOptions);
  //  send response
  sendResponse<INewsletter[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Newsletter fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleNewsletter = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await newsletterService.getSingleNewsletter(id);

  // send response
  sendResponse<INewsletter>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Newsletter fetch successfully",
    data: result,
  });
});
const updateNewsletter = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await newsletterService.updateNewsletter(id, academicFaculty);

  // send response
  sendResponse<INewsletter>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Newsletter updated successfully.",
    data: result,
  });
});
const deleteNewsletter = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await newsletterService.deleteNewsletter(id);

  // send response
  sendResponse<INewsletter>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Newsletter deleted successfully.",
    data: result,
  });
});

export const newsletterController = {
  createNewsletter,
  getAllNewsletter,
  getSingleNewsletter,
  updateNewsletter,
  deleteNewsletter,
};
