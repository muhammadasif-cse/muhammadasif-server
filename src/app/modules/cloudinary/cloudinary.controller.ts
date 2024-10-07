import {Request, Response} from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {ICloudinary, ICloudinaryResponse} from "./cloudinary.interface";
import {CloudinaryService} from "./cloudinary.service";
import {REQUEST_MESSAGES} from "./cloudinary.constant";

const createCloudinary = catchAsync(async (req: Request, res: Response) => {
  const {...cloudinary} = req.body;

  if (!cloudinary) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: REQUEST_MESSAGES.NOT_FOUND,
    });
  }

  const result = await CloudinaryService.createCloudinary({url: cloudinary.file});

  // Send response
  sendResponse<ICloudinary>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: REQUEST_MESSAGES.CREATE,
    data: result,
  });
});

const getAllCloudinary = catchAsync(async (req: Request, res: Response) => {
  const result = await CloudinaryService.getAllCloudinary();
  //  send response
  sendResponse<ICloudinaryResponse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: REQUEST_MESSAGES.GET,
    data: result,
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
  sendResponse<ICloudinaryResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: REQUEST_MESSAGES.GET,
    data: result,
  });
});

const deleteCloudinary = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await CloudinaryService.deleteCloudinary(id);
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
  deleteCloudinary,
};
