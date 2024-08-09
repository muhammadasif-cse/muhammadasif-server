import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {socialFilterableFields} from "./social.constant";
import {ISocial} from "./social.interface";
import {SocialService} from "./social.service";

const createSocial = catchAsync(async (req: Request, res: Response) => {
  const {...Social} = req.body;
  // create Social
  const result = await SocialService.createSocial(Social);

  //  send response
  sendResponse<ISocial>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Social create successfully.",
    data: result,
  });
});
const getAllSocial = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, socialFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SocialService.getAllSocial(filters, paginationOptions);
  //  send response
  sendResponse<ISocial[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Social fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleSocial = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await SocialService.getSingleSocial(id);

  // send response
  sendResponse<ISocial>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Social fetch successfully",
    data: result,
  });
});
const updateSocial = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await SocialService.updateSocial(id, academicFaculty);

  // send response
  sendResponse<ISocial>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Social updated successfully.",
    data: result,
  });
});
const deleteSocial = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await SocialService.deleteSocial(id);

  // send response
  sendResponse<ISocial>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Social deleted successfully.",
    data: result,
  });
});

export const SocialController = {
  createSocial,
  getAllSocial,
  getSingleSocial,
  updateSocial,
  deleteSocial,
};
