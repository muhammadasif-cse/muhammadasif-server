import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {ExperienceService} from "./experience.service";
import {IExperience} from "./experience.interface";
import {experienceFilterableFields} from "./experience.constant";

const createExperience = catchAsync(async (req: Request, res: Response) => {
  const {...Experience} = req.body;
  // create Experience
  const result = await ExperienceService.createExperience(Experience);

  //  send response
  sendResponse<IExperience>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience create successfully.",
    data: result,
  });
});
const getAllExperience = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, experienceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ExperienceService.getAllExperience(filters, paginationOptions);
  //  send response
  sendResponse<IExperience[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleExperience = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await ExperienceService.getSingleExperience(id);

  // send response
  sendResponse<IExperience>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Experience fetch successfully",
    data: result,
  });
});
const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await ExperienceService.updateExperience(id, academicFaculty);

  // send response
  sendResponse<IExperience>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience updated successfully.",
    data: result,
  });
});
const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await ExperienceService.deleteExperience(id);

  // send response
  sendResponse<IExperience>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience deleted successfully.",
    data: result,
  });
});

export const ExperienceController = {
  createExperience,
  getAllExperience,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
