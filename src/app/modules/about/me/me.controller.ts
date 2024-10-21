import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {aboutMeService} from "./me.service";
import {IAboutMe} from "./me.interface";
import {aboutMeFilterableFields} from "./me.constant";

const createAboutMe = catchAsync(async (req: Request, res: Response) => {
  const {...AboutMe} = req.body;
  // create AboutMe
  const result = await aboutMeService.createAboutMe(AboutMe);

  //  send response
  sendResponse<IAboutMe>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "About me create successfully.",
    data: result,
  });
});
const getAllAboutMe = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, aboutMeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await aboutMeService.getAllAboutMe(filters, paginationOptions);
  //  send response
  sendResponse<IAboutMe[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "About me fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleAboutMe = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await aboutMeService.getSingleAboutMe(id);

  // send response
  sendResponse<IAboutMe>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single About me fetch successfully",
    data: result,
  });
});
const updateAboutMe = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await aboutMeService.updateAboutMe(id, academicFaculty);

  // send response
  sendResponse<IAboutMe>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "About me updated successfully.",
    data: result,
  });
});
const deleteAboutMe = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await aboutMeService.deleteAboutMe(id);

  // send response
  sendResponse<IAboutMe>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "About me deleted successfully.",
    data: result,
  });
});

export const AboutMeController = {
  createAboutMe,
  getAllAboutMe,
  getSingleAboutMe,
  updateAboutMe,
  deleteAboutMe,
};
