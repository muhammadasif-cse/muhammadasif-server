import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {submenuFilterableFields} from "./submenu.constant";
import {ISubmenu} from "./submenu.interface";
import {SubmenuService} from "./submenu.service";

const createSubmenu = catchAsync(async (req: Request, res: Response) => {
  const {...Submenu} = req.body;
  // create Submenu
  const result = await SubmenuService.createSubmenu(Submenu);

  //  send response
  sendResponse<ISubmenu>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Submenu create successfully.",
    data: result,
  });
});
const getAllSubmenu = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, submenuFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SubmenuService.getAllSubmenu(filters, paginationOptions);
  //  send response
  sendResponse<ISubmenu[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Submenu fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleSubmenu = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await SubmenuService.getSingleSubmenu(id);

  // send response
  sendResponse<ISubmenu>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Submenu fetch successfully",
    data: result,
  });
});
const updateSubmenu = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await SubmenuService.updateSubmenu(id, academicFaculty);

  // send response
  sendResponse<ISubmenu>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Submenu updated successfully.",
    data: result,
  });
});
const deleteSubmenu = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await SubmenuService.deleteSubmenu(id);

  // send response
  sendResponse<ISubmenu>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Submenu deleted successfully.",
    data: result,
  });
});

export const SubmenuController = {
  createSubmenu,
  getAllSubmenu,
  getSingleSubmenu,
  updateSubmenu,
  deleteSubmenu,
};
