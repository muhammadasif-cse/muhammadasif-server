import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {navigationFilterableFields} from "./navigation.constant";
import {INavigation} from "./navigation.interface";
import {NavigationService} from "./navigation.service";

const createNavigation = catchAsync(async (req: Request, res: Response) => {
  const {...navigation} = req.body;
  // create navigation
  const result = await NavigationService.createNavigation(navigation);

  //  send response
  sendResponse<INavigation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Navigation create successfully.",
    data: result,
  });
});
const getAllNavigation = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, navigationFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await NavigationService.getAllNavigation(filters, paginationOptions);
  //  send response
  sendResponse<INavigation[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Navigation fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleNavigation = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await NavigationService.getSingleNavigation(id);

  // send response
  sendResponse<INavigation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Navigation fetch successfully",
    data: result,
  });
});
const updateNavigation = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await NavigationService.updateNavigation(id, academicFaculty);

  // send response
  sendResponse<INavigation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Navigation updated successfully.",
    data: result,
  });
});
const deleteNavigation = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await NavigationService.deleteNavigation(id);

  // send response
  sendResponse<INavigation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Navigation deleted successfully.",
    data: result,
  });
});

export const NavigationController = {
  createNavigation,
  getAllNavigation,
  getSingleNavigation,
  updateNavigation,
  deleteNavigation,
};
