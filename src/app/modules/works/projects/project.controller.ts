import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {projectFilterableFields} from "./project.constant";
import {IProject} from "./project.interface";
import {ProjectService} from "./project.service";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const {...Project} = req.body;
  // create Project
  const result = await ProjectService.createProject(Project);

  //  send response
  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project create successfully.",
    data: result,
  });
});
const getAllProject = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, projectFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProjectService.getAllProject(filters, paginationOptions);
  //  send response
  sendResponse<IProject[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await ProjectService.getSingleProject(id);

  // send response
  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Project fetch successfully",
    data: result,
  });
});
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await ProjectService.updateProject(id, academicFaculty);

  // send response
  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully.",
    data: result,
  });
});
const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await ProjectService.deleteProject(id);

  // send response
  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully.",
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  deleteProject,
};
