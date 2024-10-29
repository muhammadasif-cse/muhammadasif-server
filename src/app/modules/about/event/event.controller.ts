import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {eventFilterableFields} from "./event.constant";
import {IEvent} from "./event.interface";
import {EventService} from "./event.service";

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const {...Event} = req.body;
  // create Event
  const result = await EventService.createEvent(Event);

  //  send response
  sendResponse<IEvent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event create successfully.",
    data: result,
  });
});
const getAllEvent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, eventFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await EventService.getAllEvent(filters, paginationOptions);
  //  send response
  sendResponse<IEvent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleEvent = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await EventService.getSingleEvent(id);

  // send response
  sendResponse<IEvent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Event fetch successfully",
    data: result,
  });
});
const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await EventService.updateEvent(id, academicFaculty);

  // send response
  sendResponse<IEvent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event updated successfully.",
    data: result,
  });
});
const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await EventService.deleteEvent(id);

  // send response
  sendResponse<IEvent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event deleted successfully.",
    data: result,
  });
});

export const EventController = {
  createEvent,
  getAllEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
