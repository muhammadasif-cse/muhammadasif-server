import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {techstackFilterableFields} from "./techstack.constant";
import {ITechstack} from "./techstack.interface";
import {TechstackService} from "./techstack.service";

const createTechstack = catchAsync(async (req: Request, res: Response) => {
  const {...Techstack} = req.body;
  // create Techstack
  const result = await TechstackService.createTechstack(Techstack);

  //  send response
  sendResponse<ITechstack>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Techstack create successfully.",
    data: result,
  });
});
const getAllTechstack = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, techstackFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await TechstackService.getAllTechstack(filters, paginationOptions);
  //  send response
  sendResponse<ITechstack[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Techstack fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleTechstack = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await TechstackService.getSingleTechstack(id);

  // send response
  sendResponse<ITechstack>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Techstack fetch successfully",
    data: result,
  });
});
const updateTechstack = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await TechstackService.updateTechstack(id, academicFaculty);

  // send response
  sendResponse<ITechstack>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Techstack updated successfully.",
    data: result,
  });
});
const deleteTechstack = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await TechstackService.deleteTechstack(id);

  // send response
  sendResponse<ITechstack>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Techstack deleted successfully.",
    data: result,
  });
});

export const TechstackController = {
  createTechstack,
  getAllTechstack,
  getSingleTechstack,
  updateTechstack,
  deleteTechstack,
};
