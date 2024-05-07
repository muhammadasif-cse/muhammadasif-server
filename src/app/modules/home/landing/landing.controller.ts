import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {landingFilterableFields} from "./landing.constant";
import {ILanding} from "./landing.interface";
import {LandingService} from "./landing.service";

const createLanding = catchAsync(async (req: Request, res: Response) => {
  const {...Landing} = req.body;
  // create Landing
  const result = await LandingService.createLanding(Landing);

  //  send response
  sendResponse<ILanding>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Landing create successfully.",
    data: result,
  });
});
const getAllLanding = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, landingFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await LandingService.getAllLanding(filters, paginationOptions);
  //  send response
  sendResponse<ILanding[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Landing fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleLanding = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await LandingService.getSingleLanding(id);

  // send response
  sendResponse<ILanding>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Landing fetch successfully",
    data: result,
  });
});
const updateLanding = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await LandingService.updateLanding(id, academicFaculty);

  // send response
  sendResponse<ILanding>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Landing updated successfully.",
    data: result,
  });
});
const deleteLanding = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await LandingService.deleteLanding(id);

  // send response
  sendResponse<ILanding>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Landing deleted successfully.",
    data: result,
  });
});

export const LandingController = {
  createLanding,
  getAllLanding,
  getSingleLanding,
  updateLanding,
  deleteLanding,
};
