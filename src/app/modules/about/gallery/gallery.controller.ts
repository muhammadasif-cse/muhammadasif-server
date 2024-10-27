import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {GalleryService} from "./gallery.service";
import {IGallery} from "./gallery.interface";
import {galleryFilterableFields} from "./gallery.constant";

const createGallery = catchAsync(async (req: Request, res: Response) => {
  const {...gallery} = req.body;
  // create Gallery
  const result = await GalleryService.createGallery(gallery);

  //  send response
  sendResponse<IGallery>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully subscribe my Gallery.",
    data: result,
  });
});
const getAllGallery = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, galleryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await GalleryService.getAllGallery(filters, paginationOptions);
  //  send response
  sendResponse<IGallery[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gallery fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleGallery = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await GalleryService.getSingleGallery(id);

  // send response
  sendResponse<IGallery>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Gallery fetch successfully",
    data: result,
  });
});
const updateGallery = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await GalleryService.updateGallery(id, academicFaculty);

  // send response
  sendResponse<IGallery>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gallery updated successfully.",
    data: result,
  });
});
const deleteGallery = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await GalleryService.deleteGallery(id);

  // send response
  sendResponse<IGallery>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gallery deleted successfully.",
    data: result,
  });
});

export const GalleryController = {
  createGallery,
  getAllGallery,
  getSingleGallery,
  updateGallery,
  deleteGallery,
};
