import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {achievementService} from "./achievement.service";
import {IAchievement} from "./achievement.interface";
import {achievementFilterableFields} from "./achievement.constant";

const createAchievement = catchAsync(async (req: Request, res: Response) => {
  const {...Achievement} = req.body;
  // create Achievement
  const result = await achievementService.createAchievement(Achievement);

  //  send response
  sendResponse<IAchievement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Achievement create successfully.",
    data: result,
  });
});
const getAllAchievement = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, achievementFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await achievementService.getAllAchievement(filters, paginationOptions);
  //  send response
  sendResponse<IAchievement[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Achievement fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleAchievement = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await achievementService.getSingleAchievement(id);

  // send response
  sendResponse<IAchievement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Achievement fetch successfully",
    data: result,
  });
});
const updateAchievement = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await achievementService.updateAchievement(id, academicFaculty);

  // send response
  sendResponse<IAchievement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Achievement updated successfully.",
    data: result,
  });
});
const deleteAchievement = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await achievementService.deleteAchievement(id);

  // send response
  sendResponse<IAchievement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Achievement deleted successfully.",
    data: result,
  });
});

export const AchievementController = {
  createAchievement,
  getAllAchievement,
  getSingleAchievement,
  updateAchievement,
  deleteAchievement,
};
