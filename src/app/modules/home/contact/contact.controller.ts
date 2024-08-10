import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {ContactService} from "./contact.service";
import {IContact} from "./contact.interface";
import {contactFilterableFields} from "./contact.constant";

const createContact = catchAsync(async (req: Request, res: Response) => {
  const {...Contact} = req.body;
  // create Contact
  const result = await ContactService.createContact(Contact);

  //  send response
  sendResponse<IContact>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact create successfully.",
    data: result,
  });
});
const getAllContact = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, contactFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ContactService.getAllContact(filters, paginationOptions);
  //  send response
  sendResponse<IContact[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleContact = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await ContactService.getSingleContact(id);

  // send response
  sendResponse<IContact>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Contact fetch successfully",
    data: result,
  });
});
const updateContact = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await ContactService.updateContact(id, academicFaculty);

  // send response
  sendResponse<IContact>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact updated successfully.",
    data: result,
  });
});
const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await ContactService.deleteContact(id);

  // send response
  sendResponse<IContact>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact deleted successfully.",
    data: result,
  });
});

export const ContactController = {
  createContact,
  getAllContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
