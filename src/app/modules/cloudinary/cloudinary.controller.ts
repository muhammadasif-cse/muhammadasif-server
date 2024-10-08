import {Request, Response} from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {ICloudinary} from "./cloudinary.interface";
import {CloudinaryService} from "./cloudinary.service";
import {cloudinaryFilterableFields, REQUEST_MESSAGES} from "./cloudinary.constant";
import {paginationFields} from "../../../constants/pagination";
import pick from "../../../shared/pick";

const createCloudinary = catchAsync(async (req: Request, res: Response) => {
  const {...cloudinary} = req.body;

  if (!cloudinary) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: REQUEST_MESSAGES.NOT_FOUND,
    });
  }

  const result = await CloudinaryService.createCloudinary({file: cloudinary.file});

  // Send response
  sendResponse<ICloudinary>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: REQUEST_MESSAGES.CREATE,
    data: result,
  });
});

const getAllCloudinary = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cloudinaryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CloudinaryService.getAllCloudinary(filters, paginationOptions);
  //  send response
  sendResponse<ICloudinary[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: REQUEST_MESSAGES.GET,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCloudinary = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await CloudinaryService.getSingleCloudinary(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: REQUEST_MESSAGES.NOT_FOUND,
    });
  }
  // send response
  sendResponse<ICloudinary>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: REQUEST_MESSAGES.GET,
    data: result,
  });
});
const updateCloudinary = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const updates = req.body;

  const result = await CloudinaryService.updateCloudinary(id, updates);

  sendResponse<ICloudinary>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: REQUEST_MESSAGES.UPDATE,
    data: result,
  });
});
const deleteCloudinary = catchAsync(async (req: Request, res: Response) => {
  const {id, public_id} = req.body;
  const payload = {id, public_id};
  const result = await CloudinaryService.deleteCloudinary(payload);
  if ((result as unknown as {result: string}).result === "not found") {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: REQUEST_MESSAGES.NOT_FOUND,
    });
  }
  // send response
  sendResponse<ICloudinary>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: REQUEST_MESSAGES.DELETE,
    data: result,
  });
});

export const CloudinaryController = {
  createCloudinary,
  getAllCloudinary,
  getSingleCloudinary,
  updateCloudinary,
  deleteCloudinary,
};
